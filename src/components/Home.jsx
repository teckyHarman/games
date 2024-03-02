import Game from './tictactoe/TicTacToe';
import './style.css';
import MemoryGame from './memorygame/MemoryGame';
import LudoGame from './ludo/Ludo';
import BingoGame from './bingo/BingoGame';

function Home() {
  return (
    <>
        <h1>Home Screen</h1>
        <div className="screen">
            <div className='container' >
              <Game />
            </div>
            <div className='container' >
              <MemoryGame />
            </div>
            <div className='container' >
              <LudoGame />
            </div>
            {/* <div className='container' >
              <BingoGame />
            </div> */}
        </div>
    </>
  );
}

export default Home;
