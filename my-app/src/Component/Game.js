import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsnext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsnext: step % 2 === 0,
    });
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner) {
      return;
    }
    squares[i] = this.state.xIsnext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsnext: !this.state.xIsnext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? "Go to #" + move : "start the game";
      return (
        <li key={move}>
          <button
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;
    if (winner) {
      status = "the Winner is " + winner;
    } else {
      status = "The next player is" + (this.state.xIsnext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => {
              this.handleClick(i);
            }}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
