//Import the useState from React.
import { useState } from 'react';

//Square function to represent each individual tic-tac-toe board.
//It has two props: 'value' and 'onSquareClick'.
function Square({ value, onSquareClick }) {
  return (
    //A button element with the class 'square'. which displays the 'value' prop ('X', 'O', or null).
    //After clicking the button, the 'onSquareClick' function is executed.
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Board function to form the tic-tac-toe game's layout
//'xIsNext' indicates which player's turn it is, 'squares' holds the current game state, and 'onPlay' responds to moves.
function Board({ xIsNext, squares, onPlay }) {
  //HandleCick funcion is activated upon clicking a square, identified by index 'i'.
  function handleClick(i) {
    //If there's a winner or the square is already filled, the click is ignored.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //Clones the squares array and updates the selected square based on the current player.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    //Calls onPlay with the new game state to trigger a state update.
    onPlay(nextSquares);
  }

  //Checks for a game winner.
  const winner = calculateWinner(squares);
  //Constructs a status message reflecting the game's current state.
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  //Visual representation of the board, broken into three rows of squares
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//Game function encapsulates the entire tic-tac-toe game logic and state.
export default function Game() {
  //State hooks for the move history and the current move index.
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  //Determines whether 'X' or 'O' is next based on the move count.
  const xIsNext = currentMove % 2 === 0;
  //Retrieves the current state of the board from the history.
  const currentSquares = history[currentMove];

  //Invoked when a new move is made
  function handlePlay(nextSquares) {
    //Updates history to the point of the current move and adds the new move.
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    //Updates state with the new history and the latest move index.
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  //Enables navigating to a previous move in the game history.
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  //Crteates a visual list of past moves, allowing for game state navigation.
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  //Renders the game board, the moves list, and game information.
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

//calculateWinner function to determine the winner of the game based on the current squares.
function calculateWinner(squares) {
  //All the possible squares that can win the game.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  //Loop through these cominations to see if any are met in the current game state.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    //If a line has the same player mark across all squares, that player wins.
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
   //If no winner is found, return null
  return null;
}