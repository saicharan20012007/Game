// WelcomeScreen.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

function WelcomeScreen({ onStartGame }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the name in local storage
    localStorage.setItem('userName', name);
    
  };

  return (
    <div>
      <h1 className='main-heading-wp'>React Tiles</h1>
      <form onSubmit={handleSubmit} className='welcome-page-container'>
        <h1 className='main-heading-wp'>Enter Your Name</h1>
        <input
          type="text"
          value={name}
          className='input-box'
          onChange={(e) => setName(e.target.value)}
        />
        <Link to="/game">
  <button type="submit" className='start-btn'>Play</button>
</Link>

      </form>
    </div>
  );
}

export default WelcomeScreen;
