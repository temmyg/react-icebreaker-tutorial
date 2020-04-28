import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props){
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <button className="square"
              onClick={ () => this.props.onClick() }>
          {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  total:Number;
  constructor(props){
    super(props);
    this.state = {
		histories: [ { squares: Array(9).fill(null) } ],
		currentIndex: 0
		//squares: Array(9).fill(null) 
	};
    this.total = 0;
  }
  renderSquare(i) {
    this.idx = i;
    return <Square value={this.state.histories[this.state.currentIndex].squares[i]}
				onClick={ () => this.handleClick(i) }
           />;
  }

  handleClick(i){
     this.total++;
     // const nsqrs = this.state.squares.slice();
	 const nsqrs = this.state.histories[this.total-1].squares.slice();
     nsqrs[i] = this.total % 2 == 0 ? 'O' : 'X'; 
     this.props.onClick(this.total);
     // this.setState({squares: nsqrs});
	 this.setState({ histories: this.state.histories.concat({squares: nsqrs}) });
	 this.setState({ currentIndex : this.total });
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = { moves: [<li key={0}><button onClick={() => this.gotoPrev(0)}>Go to game start</button></li>] };
	this.boardRef = React.createRef();
	// this.state = { moves: ["Go to game start"] };
  }
  addMoves(step){
    let btntext = "Go to move #" + step;
    const nmvs = this.state.moves.concat([<li key={step} onClick={ () => this.gotoPrev(step) }><button>{btntext}</button></li>]);
	// const nmvs = this.state.moves.concat(["Go to move #" + step]);
    this.setState({moves : nmvs}); 
  }
  gotoPrev(step) {
	 //debugger
	 this.boardRef.current.setState({currentIndex: step});
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={ (step) => this.addMoves(step) } ref={ this.boardRef }/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{this.state.moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
