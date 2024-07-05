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

export const showPossibleMoves = (table, row, col, piece) => {
  let board = emptyBoard;
  switch (piece) {

    // white pawn
    case whitePawn:
      // go straight
      if (table[row - 1][col] === '') {
        board[row - 1][col] = spot
        // can go 2 step from start
        if (row === 6 && table[row - 2][col] === '')
          board[row - 2][col] = spot
      }
      // left attack
      if (isBlackPiece(table[row - 1][col - 1]))
        board[row - 1][col - 1] = spot;
      // right attack
      if (isBlackPiece(table[row - 1][col + 1]))
        board[row - 1][col + 1] = spot;
      // Promotion - Not available
      // En passant

      return board;

    // black pawn
    case blackPawn:
      if (table[row + 1][col] === '') {
        board[row + 1][col] = spot
        if (row === 1 && table[row + 2][col] === '')
          board[row + 2][col] = spot
      }
      if (isWhitePiece(table[row + 1][col - 1]))
        board[row + 1][col - 1] = spot;
      if (isWhitePiece(table[row + 1][col + 1]))
        board[row + 1][col + 1] = spot;
      return board;

    // rook
    case whiteRook:
    case blackRook:
      board = rookMoves(table, row, col, piece);
      return board;

    // knight
    case whiteKnight:
    case blackKnight:
      if (row > 1 && col > 0 && isValidTile(piece, table[row - 2][col - 1]))
        board[row - 2][col - 1] = spot
      if (row > 1 && col < 7 && isValidTile(piece, table[row - 2][col + 1]))
        board[row - 2][col + 1] = spot

      if (row < 6 && col > 0 && isValidTile(piece, table[row + 2][col - 1]))
        board[row + 2][col - 1] = spot
      if (row < 6 && col < 7 && isValidTile(piece, table[row + 2][col + 1]))
        board[row + 2][col + 1] = spot

      if (row > 0 && col > 1 && isValidTile(piece, table[row - 1][col - 2]))
        board[row - 1][col - 2] = spot
      if (row < 7 && col > 1 && isValidTile(piece, table[row + 1][col - 2]))
        board[row + 1][col - 2] = spot

      if (row > 0 && col < 6 && isValidTile(piece, table[row - 1][col + 2]))
        board[row - 1][col + 2] = spot
      if (row < 7 && col < 6 && isValidTile(piece, table[row + 1][col + 2]))
        board[row + 1][col + 2] = spot
      return board;

    // bishop
    case whiteBishop:
    case blackBishop:
      board = bishopMoves(table, row, col, piece);
      return board;

    // king
    case whiteKing:
    case blackKing:
      board = kingMoves(table, row, col, piece);
      return board;

    // queen
    case whiteQueen:
    case blackQueen:
      board = rookMoves(table, row, col, piece);
      board = bishopMoves(table, row, col, piece);
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
  return board;
}

const isSafePosition = (table, row, col, piece) => {
  if (isRookOrQueenAttacking(table, row, col, piece) || isBishopOrQueenAttacking(table, row, col, piece) || isKightAttacking(table, row, col, piece)
    || isPawnAttacking(table, row, col, piece) || isKingAttacking(table, row, col, piece))
    return false;

  console.log('SafePosition r -> ' + row + ' c ->' + col)
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
  console.log('row -> ' + row + ' col ->' + col)
  // left top
  let r = row - 1, c = col - 1;
  while (r >= 0 && c >= 0) {

    console.log('left top r -> ' + r + ' c ->' + c)
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

    console.log('right top r -> ' + r + ' c ->' + c)
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
    console.log('left bottom r -> ' + r + ' c ->' + c)
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
    console.log('right bottom r -> ' + r + ' c ->' + c)
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

  if (piece == blackKing) {
    if (isOpponentPawn(piece, table[row + 1][col - 1]))
      return true;
    if (isOpponentPawn(piece, table[row + 1][col + 1]))
      return true;
  }

  if (piece == whiteKing) {
    if (isOpponentPawn(piece, table[row - 1][col - 1]))
      return true;
    if (isOpponentPawn(piece, table[row - 1][col + 1]))
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

const rookMoves = (table, row, col, piece) => {
  let board = emptyBoard;
  // up
  for (let i = row + 1; i < table.length; i++) {
    if (table[i][col] === '')
      board[i][col] = spot;
    else if (isOpponentPiece(piece, table[i][col])) {
      board[i][col] = spot;
      break;
    }
    else break;
  }

  // down
  for (let i = row - 1; i >= 0; i--) {
    if (table[i][col] === '')
      board[i][col] = spot;
    else if (isOpponentPiece(piece, table[i][col])) {
      board[i][col] = spot;
      break;
    }
    else break;
  }

  // right
  for (let i = col + 1; i < table.length; i++) {
    if (table[row][i] === '')
      board[row][i] = spot;
    else if (isOpponentPiece(piece, table[row][i])) {
      board[row][i] = spot;
      break;
    }
    else break;
  }

  // left
  for (let i = col - 1; i >= 0; i--) {
    if (table[row][i] === '')
      board[row][i] = spot;
    else if (isOpponentPiece(piece, table[row][i])) {
      board[row][i] = spot;
      break;
    }
    else break;
  }
  return board;
}

const bishopMoves = (table, row, col, piece) => {
  let board = emptyBoard;

  // left top
  let r = row - 1, c = col - 1;
  while (r >= 0 && c >= 0) {
    if (table[r][c] === '')
      board[r][c] = spot;
    else if (isOpponentPiece(piece, table[r][c])) {
      board[r][c] = spot;
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
      board[r][c] = spot;
    else if (isOpponentPiece(piece, table[r][c])) {
      board[r][c] = spot;
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
      board[r][c] = spot;
    else if (isOpponentPiece(piece, table[r][c])) {
      board[r][c] = spot;
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
      board[r][c] = spot;
    else if (isOpponentPiece(piece, table[r][c])) {
      board[r][c] = spot;
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