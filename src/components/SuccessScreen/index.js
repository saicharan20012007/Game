// SuccessScreen.js

import React from 'react';

const SuccessScreen = ({ userName }) => {
  return (
    <div className="success-screen">
      <h1>Congratulations, {userName}!</h1>
      <p>You have completed the game successfully.</p>
    </div>
  );
}

export default SuccessScreen;
