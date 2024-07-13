import {
    whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
    blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn
  } from './constants.js'

export const startBoard = [
    [blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook],
    [blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    [whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn, whitePawn],
    [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook],
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
      [blackRook, '', '', whitePawn, whiteKing, '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', blackKing, '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];

    
export const enpassantBoard = [
  [blackRook, blackKnight, blackBishop, blackQueen, blackKing, blackBishop, blackKnight, blackRook],
  [blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', whitePawn, '', '', ''],
  ['', '', '', blackPawn, '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  [whitePawn, whitePawn, whitePawn, whitePawn, '', whitePawn, whitePawn, whitePawn],
  [whiteRook, whiteKnight, whiteBishop, whiteQueen, whiteKing, whiteBishop, whiteKnight, whiteRook],
];

    
export const castlingBoard = [
  [blackRook, '', '', '', blackKing, '', '', blackRook],
  [blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn, blackPawn],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', whitePawn, '', '', ''],
  ['', '', '', '', '', '', '', ''],
  [whitePawn, whitePawn, whitePawn, whitePawn, '', whitePawn, whitePawn, whitePawn],
  [whiteRook, '', '', '', whiteKing, '', '', whiteRook],
];

