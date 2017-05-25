import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {doMove} from '../state/actions';
import {MOVES} from './Board';
import '../styles/BoardCell.css';

class BoardCell extends Component {
	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this);
		this.calcDirection = this.calcDirection.bind(this);
		this.getAnimation = this.getAnimation.bind(this);
		this.state = {
			gameOver: false
		};
	}

	onClick(e){
		var row = this.props.rowId;
		var col = this.props.colId;
		var direction = this.calcDirection(row, col);
		if(direction != null && !this.props.won){
			this.props.move(direction);
		}
	}
	calcDirection(row, col){
		var blankRow = this.props.blankPos[0];
		var blankCol = this.props.blankPos[1];

		if(blankRow === row && blankCol === col){
			return null;
		}

		if(blankRow === row && blankCol === col + 1){
			return MOVES.LEFT;
		}
		else if(blankRow === row && blankCol === col - 1){
			return MOVES.RIGHT;
		}
		else if(blankRow === row - 1 && blankCol === col){
			return MOVES.DOWN;
		}
		else if(blankRow === row + 1 && blankCol === col){
			return MOVES.UP;
		}
	}

	getAnimation(){
		var classList = "";
		var lastMove = null;
		if(this.props.allMoves.length > 0){
			lastMove = this.props.allMoves[this.props.allMoves.length - 1]
		}
		if(lastMove != null){
			var from = lastMove.from;
			var to = lastMove.to;
			var row = this.props.rowId;
			var col = this.props.colId;
			if(to[0] === row && to[1] === col){
				classList = "movedTo"
			}
			else if(from[0] === row && from[1] === col){
				classList = "movedFrom"
			}
		}

		return classList;
	}
	render() {
		var animationClass = this.getAnimation();
		return (
			<span onClick={this.onClick} key={[this.props.rowId, this.props.colId]} className={"BoardCell " + animationClass}  style={this.props.style}>
				{this.props.cellValue}
			</span>
		)
	}
}

BoardCell.propTypes = {
	cellValue: PropTypes.number.isRequired,
	style: PropTypes.object,
	rowId: PropTypes.number.isRequired,
	colId: PropTypes.number.isRequired,
	blankPos: PropTypes.array.isRequired,
	won: PropTypes.bool.isRequired
}

// export default connect(mapStateToProps)(App);

function mapStateToProps(state){
	return {
		blankPos: state.blankPos,
		allMoves: state.moves
	};
}

function mapDispatchToProps(dispatch){
	return {
		move: function(direction){
			dispatch(doMove(direction));
		}
	}
}
const BoardCellContainer = connect(mapStateToProps, mapDispatchToProps)(BoardCell);
export default BoardCellContainer;
