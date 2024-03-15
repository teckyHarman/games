import React, { useState, useEffect } from 'react';
import './BingoGame.css';

function BingoGame() {
  const [tableData, setTableData] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    let numbers = [];
    let randomNumbers = [];
    for (let i = 1; i <= 25; i++) {
      numbers.push(i);
    }

    for (let i = 1; i <= 25; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      randomNumbers.push(randomNumber);
      numbers = [...numbers.slice(0, randomIndex), ...numbers.slice(randomIndex + 1)];
    }

    generateTableData(randomNumbers);
  }, []);

  const generateTableData = (randomNumbers) => {
    const tData = [];
    const arr = [];
    for (let i = 0; i < 5; i++) {
      const rowData = [];
      for (let j = 0; j < 5; j++) {
        rowData.push(randomNumbers[0]);
        randomNumbers = randomNumbers.slice(1);
      }
      tData.push(rowData);
      arr.push([0,0,0,0,0]);
    }
    setTableData(tData);
    setTable(arr);
  }

  const onTileClicked =  (row, col) => {
    console.log('clicked '+row+' col -> '+col)
    const t = table;
    const rowArr = t[row];
    rowArr[col] = 1;
    console.log('table -> '+t)
    setTable(t);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>B</th>
            <th>I</th>
            <th>N</th>
            <th>G</th>
            <th>O</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {rowData.map((cellData, cellIndex) => (
                <td key={cellIndex}>
                  <button className='tile' onClick={() => onTileClicked(rowIndex, cellIndex)}>
                    {cellData}
                    {
                      table[rowIndex][cellData] === 1 && (
                        <div className='mask'>
                        /
                      </div>
                      )
                    }
                    
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoGame;
