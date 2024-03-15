// import React, { useState, useEffect } from 'react';
import './Chess.css';

function Tile(props) {

  return (
    <div>
        <button className={(props.row + props.col) % 2 === 0?'tile':'tile-black'} 
                onClick={() => props.onClick(props.row, props.col, props.piece)} >
                    <div className='pices'>
                        {props.piece}
                    </div>
        </button>
    </div>
  );
};

export default Tile;
