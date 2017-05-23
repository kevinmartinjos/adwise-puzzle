import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setInitialBoard, setInitialized, loadState} from '../state/actions';

class Puzzle extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		console.log(this.props.initialized);
		if(!this.props.initialized){
			this.props.initializeBoard();
		}
	}
	render() {
		return (
			<div>
				{this.props.initialBoard.map(function(row){
					var rows = row.map(function(num){
						return (<span>{num} </span>);
					});

					rows.push(<br />);
					return rows;
				})}

			</div>
		
		)
	}
}

function mapStateToProps(state){
	return {
		initialBoard: state.initialBoard,
		initialized: state.initialized
	};
}

var MOVES = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4
};

function getInitialBoard(){
	var board = [];
	var m_rows = 3;
	var m_cols = 3;
	for(var i=0; i<m_rows; i++){
		var row = [];
		for(var j=0; j<m_cols; j++){
			row.push(i*m_cols + j);
		}
		board.push(row);
	}
	board[m_rows - 1][m_cols - 1] = "_";
	return scrambleBoard(board, m_rows, m_cols);
}

function swap(board, blankPos, targetPos){
	var temp = board[targetPos[0]][targetPos[1]];
	board[targetPos[0]][targetPos[1]] = board[blankPos[0]][blankPos[1]];
	board[blankPos[0]][blankPos[1]] = temp;
	return board;
}

function move(board, type, blankPos, m_rows, m_cols){
	var blankX = blankPos[0];
	var blankY = blankPos[1];

	switch(type){
		case MOVES.LEFT: 
			if(blankY == 0)
				return {board: board, blankPos: blankPos};
			return {board: swap(board, blankPos, [blankX, blankY - 1]), blankPos: [blankX, blankY - 1]};
			break;
		case MOVES.RIGHT:
			if(blankY == m_cols - 1)
				return {board: board, blankPos: blankPos};
			return {board: swap(board, blankPos, [blankX, blankY + 1]), blankPos: [blankX, blankY + 1]};
			break;
		case MOVES.UP:
			if(blankX == 0)
				return {board: board, blankPos: blankPos};
			return {board: swap(board, blankPos, [blankX - 1, blankY]), blankPos: [blankX - 1, blankY]};
			break;
		case MOVES.DOWN:
			if(blankX == m_rows - 1)
				return {board: board, blankPos: blankPos};
			return {board: swap(board, blankPos, [blankX + 1, blankY]), blankPos: [blankX + 1, blankY]};
			break;
	}
}

function scrambleBoard(board, m_rows, m_cols){
	var blank = board[m_rows - 1, m_cols - 1];
	var newConfig = move(board, MOVES.LEFT, [m_rows - 1, m_cols - 1], m_rows, m_cols);	

	for(var i=0; i < 200; i++){
		var moveType = Math.floor(Math.random() * (5 - 1)) + 1;
		board = newConfig.board;
		var blankPos = newConfig.blankPos;
		newConfig = move(board, moveType, blankPos, m_rows, m_cols);
	}

	return newConfig.board;
}

function mapDispatchToProps(dispatch){
	return {
		initializeBoard: function(){
			var persistedState = localStorage.getItem("adwise");
			// if(persistedState != undefined){
			// 	persistedState = JSON.parse(persistedState);
			// 	dispatch(loadState(persistedState));
			// }
			// else{
				dispatch(setInitialBoard(getInitialBoard()));
				dispatch(setInitialized(true));
			// }
		}
	}
}
// export default connect(mapStateToProps)(App);
const PuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(Puzzle);
export default PuzzleContainer;
