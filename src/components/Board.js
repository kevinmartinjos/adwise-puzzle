import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col} from 'react-bootstrap';
import BoardRow from './BoardRow';
import {setWon} from '../state/actions';
import '../styles/Board.css';

class Board extends Component {
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(nextProps){
		var hasWon = checkIfWon(nextProps.board);
		if(hasWon){
			this.props.onWin(true);
		}
	}

	render() {
		var self = this;
		return (
			<div>
				{this.props.board.map(function(row, rowId){
					return <BoardRow key={rowId} rowId={rowId} row={row} won={self.props.hasWon}/>
				})}
				{this.props.hasWon &&
					<Col lg={12}>
						<div className="winMessage">You Won!</div>
					</Col>
				}
			</div>
		
		)
	}
}

Board.propTypes = {
	board: PropTypes.array.isRequired,
	hasWon: PropTypes.bool.isRequired
}

export const MOVES = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4
};

/*
	TODO: Get board dimensions as arguments. Would be trivial to increase/decrease 
	difficulty level this way.
*/
export function getInitialBoard(){
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
	var boardState = scrambleBoard(board, m_rows, m_cols);

	//so that we will never have a board that is already in win-state
	while(boardState.board[m_rows - 1][m_cols - 1] === "_"){
		boardState = scrambleBoard(board, m_rows, m_cols);
	}

	return boardState;
}

function swap(board, blankPos, targetPos){
	var temp = board[targetPos[0]][targetPos[1]];
	board[targetPos[0]][targetPos[1]] = board[blankPos[0]][blankPos[1]];
	board[blankPos[0]][blankPos[1]] = temp;
	return board;
}

export function move(board, type, blankPos, m_rows, m_cols){
	var board = Object.assign([], board);
	var blankX = blankPos[0];
	var blankY = blankPos[1];

	switch(type){
		case MOVES.LEFT: 
			if(blankY == 0)
				return {board: board, blankPos: blankPos};
			return {
				board: swap(board, blankPos, [blankX, blankY - 1]),
				blankPos: [blankX, blankY - 1],
				move: {from: [blankX, blankY - 1], to: blankPos}
			};
			break;
		case MOVES.RIGHT:
			if(blankY == m_cols - 1)
				return {board: board, blankPos: blankPos};
			return {
				board: swap(board, blankPos, [blankX, blankY + 1]),
				blankPos: [blankX, blankY + 1],
				move: {from: [blankX, blankY + 1], to: blankPos}
			};
			break;
		case MOVES.UP:
			if(blankX == 0)
				return {board: board, blankPos: blankPos};
			return {
				board: swap(board, blankPos, [blankX - 1, blankY]),
				blankPos: [blankX - 1, blankY],
				move: {from: [blankX - 1, blankY], to: blankPos}
			};
			break;
		case MOVES.DOWN:
			if(blankX == m_rows - 1)
				return {board: board, blankPos: blankPos};
			return {
				board: swap(board, blankPos, [blankX + 1, blankY]),
				blankPos: [blankX + 1, blankY],
				move: {from: [blankX + 1, blankY], to: blankPos}
			};
			break;
	}
}

function scrambleBoard(board, m_rows, m_cols){
	var blank = board[m_rows - 1, m_cols - 1];
	var newConfig = move(board, MOVES.LEFT, [m_rows - 1, m_cols - 1], m_rows, m_cols);	

	//an arbitrary number. Can be generated from the board dimensions. Some other day
	var MAX_MOVES = 200;

	for(var i=0; i < MAX_MOVES; i++){
		var moveType = Math.floor(Math.random() * (5 - 1)) + 1;
		board = newConfig.board;
		var blankPos = newConfig.blankPos;
		newConfig = move(board, moveType, blankPos, m_rows, m_cols);
	}

	newConfig.dimensions = {
		rows: m_rows,
		cols: m_cols
	};

	return newConfig;
}

function checkIfWon(board){
	var currentOrdering = [];
	board.forEach(function(row){
		currentOrdering = currentOrdering.concat(row);
	});

	var current;
	var prev = currentOrdering[0];

	//blank won't be at the beginning if the user has won. It should be at the end.
	if(prev === "_"){
		return false;
	}

	//we can save some cycles by checking if last position is a blank. It should be on a won board
	if(currentOrdering[currentOrdering.length - 1] !== "_"){
		return false;
	}

	for(var i=1; i<currentOrdering.length; i++){
		current = currentOrdering[i];

		/*blank can be encountered only at last position. So if we see a blank,
		that means the loop proceeded till the very end of 'currentOrdering' without 
		encountering a wrong order. Hence this means the board is in a win state*/
		if(current === "_"){
			return true;
		}

		if(prev > current){
			return false;
		}
		prev = currentOrdering[i];

	}

	//The control will never reach here. I hope. 
	return false;
}


function mapStateToProps(state){
	return{
		hasWon: state.hasWon
	};
}

function mapDispatchToProps(dispatch){
	return {
		onWin: function(won){
			dispatch(setWon(won));
		}
	}
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
