import React, { useState, useEffect } from 'react';
import './BingoGame.css';

const BingoGame = () => {
  const [bingoNumbers, setBingoNumbers] = useState([]);
  const [playerCard, setPlayerCard] = useState([]);

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= 75; i++) {
      numbers.push(i);
    }
    setBingoNumbers(numbers);
  }, []);

  useEffect(() => {
    // Generate player card
    const card = [];
    while (card.length < 25) {
      const randomIndex = Math.floor(Math.random() * bingoNumbers.length);
      const randomNumber = bingoNumbers[randomIndex];
      if (!card.includes(randomNumber)) {
        card.push(randomNumber);
      }
    }
    setPlayerCard(card);
  }, [bingoNumbers]);

  const handleDrawNumber = () => {
    // Logic to draw a number
    console.log("Draw Number");
  };

  return (
    <div className="bingo-game">
      <h1>Bingo Game</h1>
      <div className="player-card">
        <h2>Your Card</h2>
        <div className="card-grid">
          {playerCard.map((number, index) => (
            <div key={index} className="card-cell">
              {number}
            </div>
          ))}
        </div>
      </div>
      <div className="draw-number">
        <h2>Draw a Number</h2>
        <button onClick={handleDrawNumber}>Draw Number</button>
      </div>
    </div>
  );
};

export default BingoGame;
