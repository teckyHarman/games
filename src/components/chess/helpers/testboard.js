import {
    whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
    blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn
  } from './constants.js'

const whitePieces = [whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn]
const blackPieces = [blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn]

export const startBoard = [
    [blackPieces[0], blackPieces[1], blackPieces[2], blackPieces[4], blackPieces[3], blackPieces[2], blackPieces[1], blackPieces[0]],
    [blackPieces[5], blackPieces[5], blackPieces[5], blackPieces[5], blackPieces[5], blackPieces[5], blackPieces[5], blackPieces[5]],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [whitePieces[5], whitePieces[5], whitePieces[5], whitePieces[5], whitePieces[5], whitePieces[5], whitePieces[5], whitePieces[5]],
    [whitePieces[0], whitePieces[1], whitePieces[2], whitePieces[4], whitePieces[3], whitePieces[2], whitePieces[1], whitePieces[0]],
  ];

export const pawnTestBoard = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', blackPawn, '', blackKing, '', ''],
    ['', '', blackQueen, '', '', '', '', ''],
    ['', whiteKing, '', '', '', '', '', ''],
    ['', '', '', '', blackRook, whiteBishop, '', ''],
    ['', '', blackKnight, '', '', '', '', ''],
    ['', '', '', '', whitePawn, '', '', ''],
    [blackBishop, '', '', '', '', '', '', ''],
  ];

  
export const testBoard = [
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', blackPawn, '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ];

  export const emptyBoard =
    [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];

export const kingBoard =
    [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', whiteKing, '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', blackKing, '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];

