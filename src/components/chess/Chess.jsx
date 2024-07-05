import React, { useState, useEffect } from 'react';
import './Chess.css';
import Promotion from './components/Promotion/Promotion';
import Grid from './components/Grid/Grid';
import {
  whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
  blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn,
  spot
} from './helpers/constants.js'
import {
  pawnTestBoard, emptyBoard, kingBoard
} from './helpers/testboard.js'
import {showPossibleMoves, hidePossibleMoves, isWhitePiece, isBlackPiece} from './helpers/functionHelper.js';

function Chess() {
  const turn = true;
  const [selectedPiece, setSelectedPiece] = useState([]);
  const [isWhitePromotionVisible, setIsWhitePromotionVisible] = useState(false);
  const [isBlackPromotionVisible, setIsBlackPromotionVisible] = useState(false);
  const [table, setTable] = useState(kingBoard);
  const [possibleMoves, setPossibleMoves] = useState(emptyBoard);
  
  const onTileClicked = (row, col, piece) => {
    if (possibleMoves[row][col] === spot) {
      let board = table;
      hidePossibleMoves(possibleMoves, setPossibleMoves);
      const selected_piece = board[selectedPiece[0]][selectedPiece[1]];
      board[selectedPiece[0]][selectedPiece[1]] = '';
      if (row === 0 && selected_piece === whitePawn) {
        setIsWhitePromotionVisible(true)
        return;
      }
      if (row === 7 && selected_piece === blackPawn) {
        setIsBlackPromotionVisible(true)
        return;
      }
      board[row][col] = selected_piece;
      setTable([...board]);
    }
    else {
      hidePossibleMoves(possibleMoves, setPossibleMoves);
      if(piece === '')
        return;
      const board = showPossibleMoves(table, row, col, piece);
      setPossibleMoves([...board]);
      setSelectedPiece([row, col]);
    }
  }

  const onPromotionSelected = (piece) => {
    let board = table;
    if (isWhitePiece(piece))
      board[0][selectedPiece[1]] = piece;
    if (isBlackPiece(piece))
      board[7][selectedPiece[1]] = piece;
    setTable([...board]);
    setIsWhitePromotionVisible(false)
    setIsBlackPromotionVisible(false)
  }

  return (
    <div >
      <h3>Chess</h3>
      {isWhitePromotionVisible && <div className='choosePiece'>
        <Promotion name={whiteRook} onPromotionSelected={onPromotionSelected} />
        <Promotion name={whiteBishop} onPromotionSelected={onPromotionSelected} />
        <Promotion name={whiteKnight} onPromotionSelected={onPromotionSelected} />
        <Promotion name={whiteQueen} onPromotionSelected={onPromotionSelected} />
      </div>}
      <div className="board">
        <Grid table={table} possibleMoves={possibleMoves} onTileClicked={onTileClicked} />
      </div>
      {isBlackPromotionVisible && <div className='choosePiece'>
        <Promotion name={blackRook} onPromotionSelected={onPromotionSelected} />
        <Promotion name={blackBishop} onPromotionSelected={onPromotionSelected} />
        <Promotion name={blackKnight} onPromotionSelected={onPromotionSelected} />
        <Promotion name={blackQueen} onPromotionSelected={onPromotionSelected} />
      </div>}
    </div>
  );
};

export default Chess;
