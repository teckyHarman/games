import React, { useState, useEffect } from 'react';
import './Chess.css';
import { getChessPiece } from './helpers/functionHelper.js'

function Tile(props) {
  return (
    <div>
      <button className={(props.row + props.col) % 2 === 0 ? 'tile' : 'tile-black'}
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
