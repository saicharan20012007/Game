import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Tile from '../Tile.js';
import './index.css';
const emojiList = [
    { id: 1, name: "smile", icon: "😀", isClicked: false },
    { id: 2, name: "heart", icon: "❤️", isClicked: false },
    { id: 3, name: "star", icon: "⭐", isClicked: false },
    { id: 4, name: "flower", icon: "🌸", isClicked: false },
    { id: 5, name: "sun", icon: "☀️", isClicked: false },
    { id: 6, name: "moon", icon: "🌙", isClicked: false },
    { id: 7, name: "cloud", icon: "☁️", isClicked: false },
    { id: 8, name: "cat", icon: "🐱", isClicked: false },
    { id: 9, name: "dog", icon: "🐶", isClicked: false },
    { id: 10, name: "apple", icon: "🍎", isClicked: false },
    { id: 11, name: "banana", icon: "🍌", isClicked: false },
    { id: 12, name: "tree", icon: "🌳", isClicked: false },
    { id: 13, name: "house", icon: "🏠", isClicked: false },
    { id: 14, name: "car", icon: "🚗", isClicked: false },
    { id: 15, name: "train", icon: "🚂", isClicked: false },
    { id: 16, name: "rocket", icon: "🚀", isClicked: false },
    { id: 17, name: "smile", icon: "😀", isClicked: false },
    { id: 18, name: "heart", icon: "❤️", isClicked: false },
    { id: 19, name: "star", icon: "⭐", isClicked: false },
    { id: 20, name: "flower", icon: "🌸", isClicked: false },
    { id: 21, name: "sun", icon: "☀️", isClicked: false },
    { id: 22, name: "moon", icon: "🌙", isClicked: false },
    { id: 23, name: "cloud", icon: "☁️", isClicked: false },
    { id: 24, name: "cat", icon: "🐱", isClicked: false },
    { id: 25, name: "dog", icon: "🐶", isClicked: false },
    { id: 26, name: "apple", icon: "🍎", isClicked: false },
    { id: 27, name: "banana", icon: "🍌", isClicked: false },
    { id: 28, name: "tree", icon: "🌳", isClicked: false },
    { id: 29, name: "house", icon: "🏠", isClicked: false },
    { id: 30, name: "car", icon: "🚗", isClicked: false },
    { id: 31, name: "train", icon: "🚂", isClicked: false },
    { id: 32, name: "rocket", icon: "🚀", isClicked: false }
];


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const GameBoard = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [board, setBoard] = useState(shuffleArray(emojiList));
  const [selectedTileId, setSelectedTileId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer
  }, []);

  // Function to handle tile click
const handleTileClick = (id) => {
    const clickedTile = board.find((tile) => tile.id === id);
  
    if (clickedTile.isClicked || selectedTileId === id) {
      return;
    }
  
    const updatedBoard = board.map((tile) =>
      tile.id === id ? { ...tile, isClicked: true } : tile
    );
  
    setBoard(updatedBoard);
  
    if (selectedTileId === null) {
      setSelectedTileId(id);
    } else {
      const firstSelectedTile = board.find((tile) => tile.id === selectedTileId);
  
      if (clickedTile.icon === firstSelectedTile.icon && clickedTile.id !== firstSelectedTile.id) {
        setScore((prevScore) => prevScore + 1);
        setSelectedTileId(null);
  
        if (updatedBoard.every((tile) => tile.isClicked)) {
          // All tiles matched
          localStorage.setItem('score', score);
          localStorage.setItem('time', time);
          navigate('/success');
        }
      } else {
        setScore((prevScore) => prevScore - 1);
        setTimeout(() => {
          const resetBoard = updatedBoard.map((tile) =>
            tile.id === id || tile.id === selectedTileId
              ? { ...tile, isClicked: false }
              : tile
          );
          setBoard(resetBoard);
          setSelectedTileId(null);
        }, 1000); // Reset the tiles after 1 second
      }
    }
  };
  
  

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="game-board">
      <h1 className="main-heading-wp">Mahajong Game</h1>
      <div className="score-timer">
        <div className="des">Score: {score}</div>
        <div className="des">Time: {formatTime(time)}</div>
      </div>
      <div className="tiles-container">
        <div className="tiles">
          {board.map((tile) => (
            <Tile
              key={tile.id}
              id={tile.id}
              image={tile.icon}
              name={tile.name}
              isClicked={tile.isClicked}
              onClick={handleTileClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
