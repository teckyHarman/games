import TicTacToe from './tictactoe/TicTacToe';
import './style.css';
import MemoryGame from './memorygame/MemoryGame';
import LudoGame from './ludo/Ludo';
import BingoGame from './bingo/BingoGame';
import Chess from './chess/Chess';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  const [screen, setScreen] = useState()
  const [selectedTab, setSelectedTab] = useState('')

  return (
    <Router>
      <div className="screen">
        <nav className="nav">
          <ul>
            <li className={selectedTab === 'pos' ? 'selectedNav' : ''}>
              <Link to="/TicTacToe">TicTacToe</Link>
            </li>
            <li className={selectedTab === 'bills' ? 'selectedNav' : ''}>
              <Link to="/MemoryGame">MemoryGame</Link>
            </li>
            <li className={selectedTab === 'generateBarcode' ? 'selectedNav' : ''}>
              <Link to="/LudoGame">LudoGame</Link>
            </li>
            <li className={selectedTab === 'saleReport' ? 'selectedNav' : ''}>
              <Link to="/BingoGame">BingoGame</Link>
            </li>
            <li className={selectedTab === 'saleReport' ? 'selectedNav' : ''}>
              <Link to="/Chess">Chess</Link>
            </li>
          </ul>
        </nav>
        <div className='container' >
          <Routes>
            <Route path="/" element={<Chess />} />
            <Route path="/TicTacToe" element={<TicTacToe />} />
            <Route path="/MemoryGame" element={<MemoryGame />} />
            <Route path="/LudoGame" element={<LudoGame />} />
            <Route path="/BingoGame" element={<BingoGame />} />
            <Route path="/Chess" element={<Chess />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Home;
