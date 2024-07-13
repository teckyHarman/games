import whiteRookImg from '../img/whiteRook.png'
import whiteKnightImg from '../img/whiteKnight.png';
import whiteBishopImg from '../img/whiteBishop.png';
import whiteQueenImg from '../img/whiteQueen.png';
import whiteKingImg from '../img/whiteKing.png';
import whitePawnImg from '../img/whitePawn.png';

import blackRookImg from '../img/blackRook.png';
import blackKnightImg from '../img/blackKnight.png';
import blackBishopImg from '../img/blackBishop.png';
import blackQueenImg from '../img/blackQueen.png';
import blackKingImg from '../img/blackKing.png';
import blackPawnImg from '../img/blackPawn.png';

import {
  whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
  blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn,
  spot
} from './constants.js'

import { emptyBoard } from './testboard.js'

const whitePieces = [whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn]
const blackPieces = [blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn]

export const getMove = (table, selected_piece, currPos, newPos) => {
  const curr_row = currPos[0]
  const curr_col = currPos[1]
  const new_row = newPos[0]
  const new_col = newPos[1]
  let move = ''

  if (selected_piece === whitePawn || selected_piece === blackPawn) {
    // Pawn
    if (table[new_row][new_col] === '')
      move = String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = String.fromCharCode(curr_row + 97) + (8 - curr_col) + 'x' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }
  else if (selected_piece === whiteRook || selected_piece === blackRook) {
    // Rook
    if (table[new_row][new_col] === '')
      move = 'R' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = 'R' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + 'x' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }
  else if (selected_piece === whiteBishop || selected_piece === blackBishop) {
    // Bishop
    if (table[new_row][new_col] === '')
      move = 'B' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = 'B' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + 'x' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }
  else if (selected_piece === whiteKnight || selected_piece === blackKnight) {
    // Knight
    if (table[new_row][new_col] === '')
      move = 'N' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = 'N' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + 'x' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }
  else if (selected_piece === whiteQueen || selected_piece === blackQueen) {
    // Queen
    if (table[new_row][new_col] === '')
      move = 'Q' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = 'Q' + String.fromCharCode(curr_row + 97) + (8 - curr_col) + 'x' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }
  else if (selected_piece === whiteKing || selected_piece === blackQueen) {
    // King
    if (table[new_row][new_col] === '')
      move = 'K' + String.fromCharCode(new_row + 97) + (8 - new_col)
    else
      move = 'Kx' + String.fromCharCode(new_row + 97) + (8 - new_col)
  }

  return move;
}

export const getChessPiece = (piece) => {
  if (piece === whiteRook)
    return whiteRookImg;
  if (piece === whiteKnight)
    return whiteKnightImg;
  if (piece === whiteBishop)
    return whiteBishopImg;
  if (piece === whiteQueen)
    return whiteQueenImg;
  if (piece === whiteKing)
    return whiteKingImg;
  if (piece === whitePawn)
    return whitePawnImg;

  if (piece === blackRook)
    return blackRookImg;
  if (piece === blackKnight)
    return blackKnightImg;
  if (piece === blackBishop)
    return blackBishopImg;
  if (piece === blackQueen)
    return blackQueenImg;
  if (piece === blackKing)
    return blackKingImg;
  if (piece === blackPawn)
    return blackPawnImg;
  return null;
}

const setBoard = (table, board, row, col, piece, currentPosition, whiteKingsPosition, blackKingsPosition) => {
  let table2 = table.map(innerArray => [...innerArray]);
  table2[currentPosition[0]][currentPosition[1]] = ''
  table2[row][col] = piece
  if (isWhitePiece(piece) && !isSafePosition(table2, whiteKingsPosition[0], whiteKingsPosition[1], whiteKing))
    return;
  else if (isBlackPiece(piece) && !isSafePosition(table2, blackKingsPosition[0], blackKingsPosition[1], blackKing))
    return;
  board[row][col] = spot;
}

export const showPossibleMoves = (table, row, col, piece, enPassantCol, whiteKingsPosition, blackKingsPosition) => {
  let board = emptyBoard;
  switch (piece) {

    // white pawn
    case whitePawn:
      // go straight
      if (table[row - 1][col] === '') {
        // board[row - 1][col] = spot
        setBoard(table, board, row - 1, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
        // can go 2 step from start
        if (row === 6 && table[row - 2][col] === '')
          // board[row - 2][col] = spot
          setBoard(table, board, row - 2, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      }
      // left attack
      if (isBlackPiece(table[row - 1][col - 1]))
        // board[row - 1][col - 1] = spot;
        setBoard(table, board, row - 1, col - 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      // right attack
      if (isBlackPiece(table[row - 1][col + 1]))
        // board[row - 1][col + 1] = spot;
        setBoard(table, board, row - 1, col + 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      // En passant
      if (row === 3 && (col === enPassantCol - 1 || col === enPassantCol + 1))
        // board[row - 1][enPassantCol] = spot;
        setBoard(table, board, row - 1, enPassantCol, piece, [row, col], whiteKingsPosition, blackKingsPosition)

      return board;

    // black pawn
    case blackPawn:
      if (table[row + 1][col] === '') {
        // board[row + 1][col] = spot
        setBoard(table, board, row + 1, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
        if (row === 1 && table[row + 2][col] === '')
          // board[row + 2][col] = spot
          setBoard(table, board, row + 2, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      }
      if (isWhitePiece(table[row + 1][col - 1]))
        // board[row + 1][col - 1] = spot;
        setBoard(table, board, row + 1, col - 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      if (isWhitePiece(table[row + 1][col + 1]))
        // board[row + 1][col + 1] = spot;
        setBoard(table, board, row + 1, col + 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      // En passant
      if (row === 4 && (col === enPassantCol - 1 || col === enPassantCol + 1))
        // board[row + 1][enPassantCol] = spot;
        setBoard(table, board, row + 1, enPassantCol, piece, [row, col], whiteKingsPosition, blackKingsPosition)

      return board;

    // rook
    case whiteRook:
    case blackRook:
      board = rookMoves(table, row, col, piece, whiteKingsPosition, blackKingsPosition);
      return board;

    // knight
    case whiteKnight:
    case blackKnight:
      if (row > 1 && col > 0 && isValidTile(piece, table[row - 2][col - 1]))
        // board[row - 2][col - 1] = spot
        setBoard(table, board, row - 2, col - 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      if (row > 1 && col < 7 && isValidTile(piece, table[row - 2][col + 1]))
         setBoard(table, board,row - 2,col + 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)

      if (row < 6 && col > 0 && isValidTile(piece, table[row + 2][col - 1]))
         setBoard(table, board,row + 2,col - 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      if (row < 6 && col < 7 && isValidTile(piece, table[row + 2][col + 1]))
         setBoard(table, board,row + 2,col + 1, piece, [row, col], whiteKingsPosition, blackKingsPosition)

      if (row > 0 && col > 1 && isValidTile(piece, table[row - 1][col - 2]))
         setBoard(table, board,row - 1,col - 2, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      if (row < 7 && col > 1 && isValidTile(piece, table[row + 1][col - 2]))
         setBoard(table, board,row + 1,col - 2, piece, [row, col], whiteKingsPosition, blackKingsPosition)

      if (row > 0 && col < 6 && isValidTile(piece, table[row - 1][col + 2]))
         setBoard(table, board,row - 1,col + 2, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      if (row < 7 && col < 6 && isValidTile(piece, table[row + 1][col + 2]))
         setBoard(table, board,row + 1,col + 2, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      return board;

    // bishop
    case whiteBishop:
    case blackBishop:
      board = bishopMoves(table, row, col, piece, whiteKingsPosition, blackKingsPosition);
      return board;

    // king
    case whiteKing:
    case blackKing:
      board = kingMoves(table, row, col, piece, whiteKingsPosition, blackKingsPosition);
      return board;

    // queen
    case whiteQueen:
    case blackQueen:
      board = rookMoves(table, row, col, piece, whiteKingsPosition, blackKingsPosition);
      board = bishopMoves(table, row, col, piece, whiteKingsPosition, blackKingsPosition);
      return board;

    case '':
      return null;

    default:
  }
}

const isValidTile = (selectedPiece, possibleSpot) => {
  if (possibleSpot === '' || isOpponentPiece(selectedPiece, possibleSpot))
    return true;
  return false;
}

const kingMoves = (table, row, col, piece) => {
  let board = emptyBoard;

  let row_start = Math.max(row - 1, 0), col_start = Math.max(col - 1, 0);
  let row_end = Math.min(row + 1, 7), col_end = Math.min(col + 1, 7);
  for (let r = row_start; r <= row_end; r++) {
    for (let c = col_start; c <= col_end; c++) {
      if (r === row && c === col)
        continue;
      if (isValidTile(piece, table[r][c]) && isSafePosition(table, r, c, piece))
        board[r][c] = spot;
    }
  }

  // Castling 
  // right side
  if (table[row][col + 1] === '' && table[row][col + 2] === '' && isAllyRook(piece, table[row][col + 3])
    && isSafePosition(table, row, col, piece) && isSafePosition(table, row, col + 1, piece) && isSafePosition(table, row, col + 2, piece) && isSafePosition(table, row, col + 3, piece)) {
    board[row][col + 2] = spot
  }

  // left side
  if (table[row][col - 1] === '' && table[row][col - 2] === '' && (table[row][col - 3] === '' && isAllyRook(piece, table[row][col - 4]))
    && isSafePosition(table, row, col, piece) && isSafePosition(table, row, col - 1, piece) && isSafePosition(table, row, col - 2, piece)
    && isSafePosition(table, row, col - 3, piece) && isSafePosition(table, row, col - 4, piece)) {
    board[row][col - 2] = spot
  }

  return board;
}

const isSafePosition = (table, row, col, piece) => {
  if (isRookOrQueenAttacking(table, row, col, piece) || isBishopOrQueenAttacking(table, row, col, piece) || isKightAttacking(table, row, col, piece)
    || isPawnAttacking(table, row, col, piece) || isKingAttacking(table, row, col, piece))
    return false;

  return true;
}

const isAllyRook = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackRook)
      return false;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteRook)
      return false;
  }

  return true;
}

const isOpponentRook = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackRook)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteRook)
      return true;
  }

  return false;
}

const isOpponentQueen = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackQueen)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteQueen)
      return true;
  }

  return false;
}

const isOpponentBishop = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackBishop)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteBishop)
      return true;
  }

  return false;
}

const isOpponentKnight = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackKnight)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteKnight)
      return true;
  }

  return false;
}

const isOpponentKing = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackKing)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whiteKing)
      return true;
  }

  return false;
}

const isOpponentPawn = (yourPiece, newPiece) => {
  if (yourPiece === whiteKing) {
    if (newPiece === blackPawn)
      return true;
  }
  else if (yourPiece === blackKing) {
    if (newPiece === whitePawn)
      return true;
  }

  return false;
}

const isRookOrQueenAttacking = (table, row, col, piece) => {
  for (let i = row + 1; i < table.length; i++) {
    if (table[i][col] === '')
      continue;
    else if (isOpponentRook(piece, table[i][col]) || isOpponentQueen(piece, table[i][col]))
      return true;
    else
      break;
  }

  // down
  for (let i = row - 1; i >= 0; i--) {
    if (table[i][col] === '')
      continue;
    else if (isOpponentRook(piece, table[i][col]) || isOpponentQueen(piece, table[i][col]))
      return true;
    else break;
  }

  // right
  for (let i = col + 1; i < table.length; i++) {
    if (table[row][i] === '')
      continue;
    else if (isOpponentRook(piece, table[row][i]) || isOpponentQueen(piece, table[row][i]))
      return true;
    else break;
  }

  // left
  for (let i = col - 1; i >= 0; i--) {
    if (table[row][i] === '')
      continue;
    else if (isOpponentRook(piece, table[row][i]) || isOpponentQueen(piece, table[row][i]))
      return true;
    else break;
  }

  return false;
}

const isBishopOrQueenAttacking = (table, row, col, piece) => {
  // left top
  let r = row - 1, c = col - 1;
  while (r >= 0 && c >= 0) {

    if (table[r][c] === '') {
      r--;
      c--;
    }
    else if (isOpponentBishop(piece, table[r][c]) || isOpponentQueen(piece, table[r][c]))
      return true;
    else
      break;
  }

  // right top
  r = row - 1;
  c = col + 1;
  while (r >= 0 && c <= 7) {

    if (table[r][c] === '') {
      r--;
      c++;
    }
    else if (isOpponentBishop(piece, table[r][c]) || isOpponentQueen(piece, table[r][c]))
      return true;
    else
      break;
  }

  // left bottom
  r = row + 1;
  c = col - 1;
  while (r <= 7 && c >= 0) {
    if (table[r][c] === '') {
      r++;
      c--;
    }
    else if (isOpponentBishop(piece, table[r][c]) || isOpponentQueen(piece, table[r][c]))
      return true;
    else
      break;
  }

  // right bottom
  r = row + 1;
  c = col + 1;
  while (r <= 7 && c <= 7) {
    if (table[r][c] === '') {
      r++;
      c++;
    }
    else if (isOpponentBishop(piece, table[r][c]) || isOpponentQueen(piece, table[r][c]))
      return true;
    else
      break;
  }
  return false;
}

const isKightAttacking = (table, row, col, piece) => {
  if (row > 1 && col > 0 && isOpponentKnight(piece, table[row - 2][col - 1]))
    return true;
  if (row > 1 && col < 7 && isOpponentKnight(piece, table[row - 2][col + 1]))
    return true;

  if (row < 6 && col > 0 && isOpponentKnight(piece, table[row + 2][col - 1]))
    return true;
  if (row < 6 && col < 7 && isOpponentKnight(piece, table[row + 2][col + 1]))
    return true;

  if (row > 0 && col > 1 && isOpponentKnight(piece, table[row - 1][col - 2]))
    return true;
  if (row < 7 && col > 1 && isOpponentKnight(piece, table[row + 1][col - 2]))
    return true;

  if (row > 0 && col < 6 && isOpponentKnight(piece, table[row - 1][col + 2]))
    return true;
  if (row < 7 && col < 6 && isOpponentKnight(piece, table[row + 1][col + 2]))
    return true;

  return false;
}

const isPawnAttacking = (table, row, col, piece) => {
  if (piece === blackKing) {
    if (row < 7 && col > 0 && isOpponentPawn(piece, table[row + 1][col - 1]))
      return true;
    if (row < 7 && col < 7 && isOpponentPawn(piece, table[row + 1][col + 1]))
      return true;
  }

  if (piece === whiteKing) {
    if (row > 0 && col > 0 && isOpponentPawn(piece, table[row - 1][col - 1]))
      return true;
    if (row > 0 && col < 7 && isOpponentPawn(piece, table[row - 1][col + 1]))
      return true;
  }

  return false;
}

const isKingAttacking = (table, row, col, piece) => {

  let row_start = Math.max(row - 1, 0), col_start = Math.max(col - 1, 0);
  let row_end = Math.min(row + 1, 7), col_end = Math.min(col + 1, 7);
  for (let r = row_start; r <= row_end; r++) {
    for (let c = col_start; c <= col_end; c++) {
      if (r === row && c === col)
        continue;
      if (isOpponentKing(piece, table[r][c]))
        return true;
    }
  }

  return false;
}

const rookMoves = (table, row, col, piece, whiteKingsPosition, blackKingsPosition) => {
  let board = emptyBoard;
  // up
  for (let i = row + 1; i < table.length; i++) {
    if (table[i][col] === '')
      // board[i][col] = spot;
      setBoard(table, board, i, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[i][col])) {
      // board[i][col] = spot;
      setBoard(table, board, i, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else break;
  }

  // down
  for (let i = row - 1; i >= 0; i--) {
    if (table[i][col] === '')
      // board[i][col] = spot;
      setBoard(table, board, i, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[i][col])) {
      // board[i][col] = spot;
      setBoard(table, board, i, col, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else break;
  }

  // right
  for (let i = col + 1; i < table.length; i++) {
    if (table[row][i] === '')
      // board[row][i] = spot;
      setBoard(table, board, row, i, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[row][i])) {
      // board[row][i] = spot;
      setBoard(table, board, row, i, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else break;
  }

  // left
  for (let i = col - 1; i >= 0; i--) {
    if (table[row][i] === '')
      // board[row][i] = spot;
      setBoard(table, board, row, i, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[row][i])) {
      // board[row][i] = spot;
      setBoard(table, board, row, i, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else break;
  }
  return board;
}

const bishopMoves = (table, row, col, piece, whiteKingsPosition, blackKingsPosition) => {
  let board = emptyBoard;

  // left top
  let r = row - 1, c = col - 1;
  while (r >= 0 && c >= 0) {
    if (table[r][c] === '')
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[r][c])) {
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else
      break;
    r--;
    c--;
  }

  // right top
  r = row - 1;
  c = col + 1;
  while (r >= 0 && c <= 7) {
    if (table[r][c] === '')
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[r][c])) {
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else
      break;
    r--;
    c++;
  }

  // left bottom
  r = row + 1;
  c = col - 1;
  while (r <= 7 && c >= 0) {
    if (table[r][c] === '')
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[r][c])) {
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else
      break;
    r++;
    c--;
  }

  // right bottom
  r = row + 1;
  c = col + 1;
  while (r <= 7 && c <= 7) {
    if (table[r][c] === '')
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
    else if (isOpponentPiece(piece, table[r][c])) {
      // board[r][c] = spot;
      setBoard(table, board, r, c, piece, [row, col], whiteKingsPosition, blackKingsPosition)
      break;
    }
    else
      break;
    r++;
    c++;
  }
  return board;
}

export const isBlackPiece = (piece) => {
  for (let i = 0; i < 6; i++) {
    if (piece === blackPieces[i])
      return true;
  }

  return false;
}

export const isWhitePiece = (piece) => {
  for (let i = 0; i < 6; i++) {
    if (piece === whitePieces[i])
      return true;
  }

  return false;
}

export const isOpponentPiece = (yourPiece, newPiece) => {
  if (isWhitePiece(yourPiece)) {
    if (isWhitePiece(newPiece))
      return false;
    else
      return true;
  }
  else {
    if (isBlackPiece(newPiece))
      return false;
    else
      return true;
  }
}

export const hidePossibleMoves = (possibleMoves, setPossibleMoves) => {
  let board = possibleMoves;

  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === spot)
        row[j] = '';
    }
  }

  setPossibleMoves([...board]);
}