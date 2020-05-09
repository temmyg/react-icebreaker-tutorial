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
			  onClick={ () => this.props.onClick() }
              onDoubleClick= { (event) => { console.log(this.props.attachedData.text); this.props.attachedData.sayHi(); } }>
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
		//histories: [ { squares: Array(9).fill(null) } ],
		//currentIndex: 0
		//squares: Array(9).fill(null) 
	};
    this.total = 0;
  }
  
  renderSquare(i) {
    this.idx = i;
	var greeting = { text: 'hello', font: 'red' }
	greeting.sayHi = function() {
		alert('hi, master!')
	}
	/*return <Square value={this.props.squares[i]} attachedData={ greeting: greeting }
				onClick={ () => this.props.onClick(i) }>
									
			</Square>;
	   // the above <button> markup should have "onClick= { (event) => console.log(this.props.attachedData.greeting.text) }" instead
	*/
	   
    /* return <Square value={this.props.squares[i]} attachedData={ greeting }
				onClick={ () => this.props.onClick(i) }>
					{ /* <div>12</div> */ /* }					
			</Square>; 
	*/
	return <Square value={this.props.squares[i]} attachedData={ { ...greeting } }
				onClick={ () => this.props.onClick(i) }>
					{ /* <div>12</div> */ }					
			</Square>;
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
  isXSign: Boolean = true;
  stepCount: Number = 0;

  constructor(props){
    super(props);
    this.state = { histories: [{ squares: Array(9).fill(null)}], moves: [<li key={0}><button onClick={() => this.jumpTo(0)}>Go to game start</button></li>], currentStep: 0 };
	//this.boardRef = React.createRef();
	// this.state = { moves: ["Go to game start"] };
  }
  
  jumpTo(i){
	console.log(i)
	this.setState({ currentStep: i});  
  }
  
  handleClick(gridIndex){
	this.stepCount++;
	let curStep = this.stepCount;
	//this.currentStep = this.stepCount;
	let nsqrs = this.state.histories[this.state.histories.length-1].squares.slice();
    nsqrs[gridIndex] = this.isXSign ? 'X' : 'O';
    this.isXSign = !this.isXSign;
	
	this.setState({ currentStep: this.stepCount })
	this.setState({ histories: this.state.histories.concat([{squares : nsqrs}]) });
	this.setState({ moves: this.state.moves.concat([<li key={this.stepCount}><button onClick={() => this.jumpTo(curStep)}>Go to move #{this.stepCount}</button></li>])});	
 }
  
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={this.state.histories[this.state.currentStep].squares} onClick={(i) => this.handleClick(i)}/>
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
