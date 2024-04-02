// import React, { useState, useEffect } from 'react';
import './Chess.css';
import whitePawnImg from './img/whitePawn.png';
import whiteRookImg from './img/whiteRook.png';
import whiteKnightImg from './img/whiteKnight.png';
import whiteBishopImg from './img/whiteBishop.png';
import whiteQueenImg from './img/whiteQueen.png';
import whiteKingImg from './img/whiteKing.png';

import blackPawnImg from './img/blackPawn.png';
import blackRookImg from './img/blackRook.png';
import blackKnightImg from './img/blackKnight.png';
import blackBishopImg from './img/blackBishop.png';
import blackQueenImg from './img/blackQueen.png';
import blackKingImg from './img/blackKing.png';

function Tile(props) {

  const whiteRook = 'wRook';
  const whiteKnight = 'wKnight';
  const whiteBishop = 'wBishop';
  const whiteKing = 'wKing';
  const whiteQueen = 'wQueen';
  const whitePawn = 'wPawn';

  const blackRook = 'bRook';
  const blackKnight = 'bKnight';
  const blackBishop = 'bBishop';
  const blackKing = 'bKing';
  const blackQueen = 'bQueen';
  const blackPawn = 'bPawn';
  
  const getChessPiece = (piece) => {
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

  return (
    <div>
        <button className={(props.row + props.col) % 2 === 0?'tile':'tile-black'} 
                onClick={() => props.onClick(props.row, props.col, props.piece)} >
                    <div className='pices'>
                        {props.piece !== '' && (<img src={getChessPiece(props.piece)} alt="" />)}
                        {props.showSpot && <div className='mask'>
                          o
                        </div>}
                    </div>
        </button>
    </div>
  );
};

export default Tile;
