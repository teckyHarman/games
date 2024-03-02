import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [turn, setTurn] = useState(true);

  // Initialize cards
  useEffect(() => {
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍋', '🍉', '🍓'];
    const initialCards = symbols.concat(symbols).sort(() => Math.random() - 0.5);
    setCards(initialCards);
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => checkForMatch(), 1000);
    }
  }, [flippedCards]);
  

  // Handle card flip
  const handleCardClick = index => {
    if (flippedCards.length === 2 || matchedCards.includes(index)) return;

    const newFlippedCards = [...flippedCards, index];
    console.log(newFlippedCards);
    setFlippedCards(newFlippedCards);
    console.log("flippedCards = "+flippedCards);

    // if (newFlippedCards.length === 2) {
    //   setTimeout(() => checkForMatch(), 1000);
    // }
  };

  // Check for matching cards
  const checkForMatch = () => {
    const [firstCardIndex, secondCardIndex] = flippedCards;
    const newMatchedCards = [...matchedCards];

    if (cards[firstCardIndex] === cards[secondCardIndex]) {
      newMatchedCards.push(...flippedCards);
    }
    else
    {
      setTurn(!turn)
    }

    setMatchedCards(newMatchedCards);
    setFlippedCards([]);
    setMoves(moves + 1);
  };

  return (
    <div className="memory-game">
      <div className="score">Turn: {turn ? 'A' : 'B'}</div>
      <div className="score">Moves: {moves}</div>
      <div className="cards-grid">
        {cards.map((symbol, index) => (
          <div
            key={index}
            className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-back">{symbol}
              <div className="card-front">?</div>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
