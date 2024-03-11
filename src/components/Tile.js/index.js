// Tile.js

import React from 'react';
import './index.css'

function Tile({ id, image, onClick , isClicked}) {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="tile" onClick={handleClick}>
     {isClicked &&  <h1>{image}</h1>}
    </div>
  );
}

export default Tile;
