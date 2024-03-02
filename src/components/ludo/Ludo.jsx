import React, { useState } from 'react';
import './style.css';

const LudoGame = () => {
  const [diceValue, setDiceValue] = useState(1); // State to store the value of the rolled dice

  // Function to handle rolling the dice
  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1; // Generate random number between 1 and 6
    setDiceValue(newValue);
  };

  return (
    <div className="ludo-game">
      <div className="game-board">
        {/* Render the Ludo board */}
      </div>
      <div className="dice">
        <button onClick={rollDice}>Roll Dice</button>
        <div>Dice Value: {diceValue}</div>
      </div>
    </div>
  );
};

export default LudoGame;
