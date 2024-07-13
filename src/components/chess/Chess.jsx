import React, { useState } from 'react';
import './Chess.css';
import Promotion from './components/Promotion/Promotion';
import Grid from './components/Grid/Grid';
import {
  whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
  blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn,
  spot
} from './helpers/constants.js'
import {
  emptyBoard, startBoard,
  // startBoard, pawnTestBoard, emptyBoard, kingBoard, enpassantBoard, castlingBoard
} from './helpers/testboard.js'
import { showPossibleMoves, hidePossibleMoves, getMove, isWhitePiece, isBlackPiece } from './helpers/functionHelper.js';

function Chess() {
  const [whiteTurn, setWhiteTurn] = useState(true);
  const [whiteKingsPosition, setWhiteKingsPosition] = useState([7,4]);
  const [blackKingsPosition, setBlackKingsPosition] = useState([0,4]);
  const [selectedPiecePosition, setSelectedPiecePosition] = useState([]);
  const [isWhitePromotionVisible, setIsWhitePromotionVisible] = useState(false);
  const [isBlackPromotionVisible, setIsBlackPromotionVisible] = useState(false);
  const [table, setTable] = useState(startBoard);
  const [possibleMoves, setPossibleMoves] = useState(emptyBoard);
  const [moves, setMoves] = useState([]);
  const [enPassantRows, setEnPassantRows] = useState([]);

  const onTileClicked = (row, col, piece) => {
    if (possibleMoves[row][col] === spot) {
      let board = table;
      hidePossibleMoves(possibleMoves, setPossibleMoves);
      const selected_piece = board[selectedPiecePosition[0]][selectedPiecePosition[1]];
      // making curr position empty
      board[selectedPiecePosition[0]][selectedPiecePosition[1]] = '';

      // En passant
      if ((row === 4 && selected_piece === whitePawn) || (row === 3 && selected_piece === blackPawn))
        setEnPassantRows(col)
      else
        setEnPassantRows('')

      if ((selected_piece === whitePawn || selected_piece === blackPawn) && col !== selectedPiecePosition[1] && piece === '') {
        board[selectedPiecePosition[0]][col] = ''
      }

      // Pawn promotion
      if (row === 0 && selected_piece === whitePawn) {
        setIsWhitePromotionVisible(true)
        return;
      }
      if (row === 7 && selected_piece === blackPawn) {
        setIsBlackPromotionVisible(true)
        return;
      }

      // Castling
      // Wrong value for kingsboard
      if (selected_piece === whiteKing || selected_piece === blackKing) {
        if(selected_piece === whiteKing)
          setWhiteKingsPosition(row, col)
        if(selected_piece === blackKing)
          setBlackKingsPosition(row, col)

        if (Math.abs(col - selectedPiecePosition[1]) === 2) {
          if (col > selectedPiecePosition[1]) {
            const rook = board[row][7]
            board[row][col - 1] = rook
            board[row][7] = ''
          } else {
            const rook = board[row][0]
            board[row][col + 1] = rook
            board[row][0] = ''
          }
        }
      }

      const move = getMove(table, selected_piece, selectedPiecePosition, [row, col])
      setMoves([...moves, move])
      board[row][col] = selected_piece;
      setTable([...board]);
      setWhiteTurn(!whiteTurn)

      // is check happening

    }
    else {
      hidePossibleMoves(possibleMoves, setPossibleMoves);
      if (piece === '')
        return;
      if ((whiteTurn === true && isWhitePiece(piece)) || (whiteTurn === false && isBlackPiece(piece))) {
        const board = showPossibleMoves(table, row, col, piece, enPassantRows,whiteKingsPosition, blackKingsPosition);
        setPossibleMoves([...board]);
        setSelectedPiecePosition([row, col]);
      }

    }
  }

  const onPromotionSelected = (piece) => {
    let board = table;
    if (isWhitePiece(piece))
      board[0][selectedPiecePosition[1]] = piece;
    if (isBlackPiece(piece))
      board[7][selectedPiecePosition[1]] = piece;
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
