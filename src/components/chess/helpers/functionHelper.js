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

import {whiteRook, whiteKnight, whiteBishop, whiteKing, whiteQueen, whitePawn,
    blackRook, blackKnight, blackBishop, blackKing, blackQueen, blackPawn } from './constants.js'

export const getChessPiece = (piece) => {
  if(piece === whiteRook)
    return whiteRookImg;
  if(piece === whiteKnight)
    return whiteKnightImg;
  if(piece === whiteBishop)
    return whiteBishopImg;
  if(piece === whiteQueen)
    return whiteQueenImg;
  if(piece === whiteKing)
    return whiteKingImg;
  if(piece === whitePawn)
    return whitePawnImg;
  
  if(piece === blackRook)
    return blackRookImg;
  if(piece === blackKnight)
    return blackKnightImg;
  if(piece === blackBishop)
    return blackBishopImg;
  if(piece === blackQueen)
    return blackQueenImg;
  if(piece === blackKing)
    return blackKingImg;
  if(piece === blackPawn)
    return blackPawnImg;
  return null;
}
