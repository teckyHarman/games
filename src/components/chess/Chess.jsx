import React, { useState, useEffect } from 'react';
import './Chess.css';
import Tile from './Tile';

function Chess() {
  const turn = true;
  const whiteIcons = ['./src/components/chess/img/whitePawn.png']
  const whitePieces = ['wRook', 'wKnight', 'wBishop', 'wKing', 'wQueen', 'wPawn']
  const blackPieces = ['bRook', 'bKnight', 'bBishop', 'bKing', 'bQueen', 'bPawn']
  const spot = '@';
  const [selectedPiece, setSelectedPiece] = useState([]);
  const startBoard = [
    [blackPieces[0],blackPieces[1],blackPieces[2],blackPieces[4],blackPieces[3],blackPieces[2],blackPieces[1],blackPieces[0]],
    [blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5],blackPieces[5]],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    [whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5],whitePieces[5]],
    [whitePieces[0],whitePieces[1],whitePieces[2],whitePieces[4],whitePieces[3],whitePieces[2],whitePieces[1],whitePieces[0]],
  ];
  // const testBoard = [
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','',whitePieces[3],'','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  //   ['','','','','','','',''],
  // ];
  const [table, setTable] = useState(startBoard);

  const [possibleMoves, setPossibleMoves] = useState(
    [
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
      ['','','','','','','',''],
    ]
  );

  const onTileClicked =  (row, col, piece) => {
    console.log('clicked row = '+row+ ' col = '+col+' piece = '+piece)
    // console.log(table[5])
    if(possibleMoves[row][col] === spot)
    {
      let board = table;
      hidePossibleMoves();
      const temp = board[selectedPiece[0]][selectedPiece[1]];
      board[selectedPiece[0]][selectedPiece[1]] = '';
      board[row][col] = temp;
      setTable([...board]);
    }
    else
    {
      hidePossibleMoves();
      showPossibleMoves(row,col,piece);
      setSelectedPiece([row, col]);
    }
  }
  const rookMoves = (board, row, col) => {
    for(let i=row+1;i<board.length;i++)
    {
      if(board[i][col] === '')
      board[i][col] = spot;
      else break;
    }
    for(let i=row-1;i>=0;i--)
    {
      if(board[i][col] === '')
      board[i][col] = spot;
      else break;
    }
    for(let i=col+1;i<board.length;i++)
    {
      if(board[row][i] === '')
      board[row][i] = spot;
      else break;
    }
    for(let i=col-1;i>=0;i--)
    {
      if(board[row][i] === '')
      board[row][i] = spot;
      else break;
    }
    return board;
  }

  const bishopMoves = (board, row, col) => {
    let r = row - 1, c = col - 1;
    while(r >= 0 && c >= 0)
    {
      if(board[r][c] === '')
        board[r][c] = spot;
      else 
        break;
      r--;
      c--;
    }

    r = row - 1;
    c = col + 1;
    while(r >= 0 && c <= 7)
    {
      if(board[r][c] === '')
        board[r][c] = spot;
      else 
        break;
      r--;
      c++;
    }

    r = row + 1;
    c = col - 1;
    while(r <= 7 && c >= 0)
    {
      if(board[r][c] === '')
        board[r][c] = spot;
      else 
        break;
      r++;
      c--;
    }

    r = row + 1;
    c = col + 1;
    while(r <= 7 && c <= 7)
    {
      if(board[r][c] === '')
        board[r][c] = spot;
      else 
        break;
      r++;
      c++;
    }
    return board;
  }

  const isBlackPiece = (board, row, col) => {
    for(let i = 0;i<6;i++)
    {
      if(board[row][col] === blackPieces[i])
        return true;
    }

    return false;
  }

  const isWhitePiece = (board, row, col) => {
    for(let i = 0;i<6;i++)
    {
      if(board[row][col] === whitePieces[i])
        return true;
    }

    return false;
  }

  const showPossibleMoves = (row, col, piece) => {
    let board = possibleMoves;

    switch (piece) {
      // white pawn
      case whitePieces[5]:
        if(table[row-1][col] !== blackPieces[5])
          board[row-1][col] = spot
        if(row === 6)
          board[row-2][col] = spot
        if(isBlackPiece(table, row-1, col-1))
          board[row-1][col-1] = spot;
        if(isBlackPiece(table, row-1, col+1))
          board[row-1][col+1] = spot;
        setPossibleMoves([...board]);
        break;
      
      // rook
      case whitePieces[0]:
      case blackPieces[0]:
        board = rookMoves(board, row, col);
        setPossibleMoves([...board]);
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
        setPossibleMoves([...board]);
      break;

      // bishop
      case whitePieces[2]:
      case blackPieces[2]:
        board = bishopMoves(board, row, col);
        setPossibleMoves([...board]);
        break;

      // king
      case whitePieces[3]:
      case blackPieces[3]:
        board[row-1][col-1] = spot;
        board[row-1][col] = spot;
        board[row-1][col+1] = spot;
        board[row][col-1] = spot;
        board[row][col+1] = spot;
        board[row+1][col-1] = spot;
        board[row+1][col] = spot;
        board[row+1][col+1] = spot;
        setPossibleMoves([...board]);
      break;

      // queen
      case whitePieces[4]:
      case blackPieces[4]:
        board = rookMoves(board, row, col);
        board = bishopMoves(board, row, col);
        setPossibleMoves([...board]);
        break;

      // black pawn
      case blackPieces[5]:
      board[row+1][col] = spot
      if(row === 1)
      board[row+2][col] = spot
      if(isWhitePiece(table, row+1, col-1))
        board[row+1][col-1] = spot;
      if(isWhitePiece(table, row+1, col+1))
        board[row+1][col+1] = spot;
      setPossibleMoves([...board]);
      break;
      default:
        
    }
  }

  const hidePossibleMoves = () => {
    let board = possibleMoves;

    for(let i=0;i<board.length;i++)
    {
      const row = board[i];
      for(let j=0;j<row.length;j++)
      {
        if(row[j]===spot)
          row[j] = '';
      }
    }

    setPossibleMoves([...board]);
  }

  const Grid = ({arr}) => {
    return (
      <table>
        <tbody>
          {table.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>
                  <Tile piece={table[rowIndex][cellIndex]} 
                        row={rowIndex} col={cellIndex} showSpot={possibleMoves[rowIndex][cellIndex]===spot}
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
    <div >
      <h3>Chess</h3>
      <div className="board">
        <Grid arr={table} />
      </div>
    </div>
  );
};

export default Chess;
