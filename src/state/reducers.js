import {SET_INITIAL_BOARD, SET_INITIALIZED, LOAD_STATE} from './actions';

const initialState = {
	initialBoard: [],
	initialized: false
};

export function AppState(state, action){
	if(typeof state === "undefined"){
		return initialState;
	}
	var newState;
	switch(action.type){
		case SET_INITIAL_BOARD:
			newState = Object.assign({}, state, {
				initialBoard: action.initialBoard
			});
			break;
		case SET_INITIALIZED:
			newState = Object.assign({}, state, {
				initialized: action.initialized
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