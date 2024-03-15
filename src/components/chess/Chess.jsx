import React, { useState, useEffect } from 'react';
import './Chess.css';
import Tile from './Tile';

function Chess() {

  const whitePieces = ['wRook', 'wKnight', 'wBishop', 'wKing', 'wQueen', 'wPawn']
  const blackPieces = ['bRook', 'bKnight', 'bBishop', 'bKing', 'bQueen', 'bPawn']
  const spot = '@';
  const [tableData, setTableData] = useState(
  [
    [blackPieces[0],blackPieces[1],blackPieces[2],blackPieces[4],blackPieces[3],blackPieces[2],blackPieces[1],blackPieces[0]],
    [blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5]],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5]],
    [whitePieces[0],whitePieces[1],whitePieces[2],whitePieces[4],whitePieces[3],whitePieces[2],whitePieces[1],whitePieces[0]],
  ]);

  useEffect(() => {
    
  }, []);


  const onTileClicked =  (row, col, piece) => {
    console.log('clicked row = '+row+ ' col = '+col+' piece = '+piece)
    hidePossibleMoves();
    showPossibleMoves(row,col,piece)
  }
  const showPossibleMoves = (row, col, piece) => {
    let board = tableData;

    switch (piece) {
      // white pawn
      case whitePieces[5]:
        board[row-1][col] = spot
        if(row === 6)
        board[row-2][col] = spot
        setTableData([...board]);
        break;
      
      // rook
      case whitePieces[0]:
      case blackPieces[0]:
        for(let i=row+1;i<board.length;i++)
        {
          if(board[row][i] === '')
          board[row][i] = spot;
          else break;
        }
        for(let i=row-1;i>=0;i--)
        {
          if(board[row][i] === '')
          board[row][i] = spot;
          else break;
        }
        for(let i=col+1;i<board.length;i++)
        {
          if(board[i][col] === '')
          board[i][col] = spot;
          else break;
        }
        for(let i=col-1;i>=0;i--)
        {
          if(board[i][col] === '')
          board[i][col] = spot;
          else break;
        }
        setTableData([...board]);
        break;

      // knight
      case whitePieces[1]:
      case blackPieces[1]:
        if(row > 1 && col > 0 && board[row-2][col-1] === '')
        board[row-2][col-1] = spot
        if(row > 1 && col < 7 && board[row-2][col+1] === '')
        board[row-2][col+1] = spot

        if(row < 6 && col > 0 && board[row+2][col-1] === '')
        board[row+2][col-1] = spot
        if(row < 6 && col < 7 && board[row+2][col+1] === '')
        board[row+2][col+1] = spot

        if(row > 0 && col > 1 && board[row-1][col-2] === '')
        board[row-1][col-2] = spot
        if(row < 7 && col > 1 && board[row+1][col-2] === '')
        board[row+1][col-2] = spot

        if(row > 0 && col < 6 && board[row-1][col+2] === '')
        board[row-1][col+2] = spot
        if(row < 7 && col < 6 && board[row+1][col+2] === '')
        board[row+1][col+2] = spot
        console.log(board)
      setTableData([...board]);
      break;

      // bishop
      case whitePieces[2]:
      case blackPieces[2]:
        
        setTableData([...board]);
        break;

      // king
      case whitePieces[4]:
      case blackPieces[4]:
        
      setTableData([...board]);
      break;

      // queen
      case whitePieces[3]:
      case blackPieces[3]:
        
        setTableData([...board]);
        break;

      // black pawn
      case blackPieces[5]:
        
      board[row+1][col] = spot
      if(row === 1)
      board[row+2][col] = spot
      setTableData([...board]);
      break;
      default:
        
    }
  }

  const hidePossibleMoves = () => {
    let board = tableData;

    for(let i=0;i<board.length;i++)
    {
      const row = board[i];
      for(let j=0;j<row.length;j++)
      {
        if(row[j]===spot)
          row[j] = '';
      }
    }

    setTableData([...board]);
  }

  const Grid = ({arr}) => {
    return (
      <table>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>
                  <Tile piece={tableData[rowIndex][cellIndex]} 
                        row={rowIndex} col={cellIndex} 
                        onClick={onTileClicked} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h3>Chess</h3>
      <Grid arr={tableData} />
    </div>
  );
};

export default Chess;
