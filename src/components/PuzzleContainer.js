import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setInitialBoard, setInitialized, loadState} from '../state/actions';
import Board, {MOVES, getInitialBoard} from './Board';

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
				<Board board={this.props.board} />
			</div>
		
		)
	}
}

Puzzle.propTypes = {
	initialized: PropTypes.bool,
	board: PropTypes.array.isRequired,
	initializeBoard: PropTypes.func.isRequired
}

function mapStateToProps(state){
	return {
		board: state.board,
		initialized: state.initialized
	};
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
