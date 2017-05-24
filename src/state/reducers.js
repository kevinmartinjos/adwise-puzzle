import {SET_INITIAL_BOARD, SET_INITIALIZED, LOAD_STATE, DO_MOVE, ADD_TIME, WON} from './actions';
import {move} from '../components/Board';

const initialState = {
	board: [],
	initialized: false,
	timeElapsed: 0,
	moves: [],
	hasWon: false
};

export function AppState(state, action){
	if(typeof state === "undefined"){
		return initialState;
	}
	var newState;
	switch(action.type){
		case SET_INITIAL_BOARD:
			newState = Object.assign({}, state, {
				board: action.initialBoard.board,
				blankPos: action.initialBoard.blankPos,
				dimensions: action.initialBoard.dimensions
			});
			break;
		case SET_INITIALIZED:
			newState = Object.assign({}, state, {
				initialized: action.initialized
			});	
			break;
		case DO_MOVE:
			var newPuzzleState = move(state.board, action.direction, state.blankPos, state.dimensions.rows, state.dimensions.cols);
			newState = Object.assign({}, state, {
				board: newPuzzleState.board,
				blankPos: newPuzzleState.blankPos,
				moves: state.moves.concat(newPuzzleState.move)
			});
			break;
		case ADD_TIME:
			newState = Object.assign({}, state, {
				timeElapsed: state.timeElapsed + 1
			});
			break;
		case WON:
			newState = Object.assign({}, state, {
				hasWon: action.hasWon
			});
			break;
		case LOAD_STATE:
			newState = Object.assign({}, action.state);
			break;
		default:
			return state;
	}

	window.localStorage.setItem("adwise", JSON.stringify(newState));
	return newState;
}