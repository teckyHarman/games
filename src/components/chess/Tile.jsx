import React from 'react';
import './Chess.css';
import { getChessPiece } from './helpers/functionHelper.js'

function Tile(props) {
  return (
    <div>
      <button className={(props.row + props.col) % 2 === 0 ? 'tile' : 'tile-black'}
        onClick={() => props.onClick(props.row, props.col, props.piece)} >
        <div className='pices'>
          {props.showSpot ?
            (<div className='mask'>
              {props.piece !== '' && (<img src={getChessPiece(props.piece)} alt="" />)}
            </div>)
            : props.piece !== '' && (<img src={getChessPiece(props.piece)} alt="" />)}

        </div>
      </button>
    </div>
  );
};

export default Tile;
