import React, { useState, useEffect } from 'react';

import Tile from '../../Tile';
import {spot} from '../../helpers/constants.js'

const Grid = ({ table, possibleMoves, onTileClicked }) => {
    return (
      <table>
        <tbody>
          {table.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>
                  <Tile piece={table[rowIndex][cellIndex]}
                    row={rowIndex} col={cellIndex} showSpot={possibleMoves[rowIndex][cellIndex] === spot}
                    onClick={onTileClicked} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  
export default Grid;