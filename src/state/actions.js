export const SET_INITIAL_BOARD = "SET_INITIAL_BOARD";
export const SET_INITIALIZED = "SET_INITIALIZED";
export const LOAD_STATE = "LOAD_STATE";
export const DO_MOVE = "DO_MOVE";
export const ADD_TIME = "ADD_TIME";
export const WON = "WON";

export function setInitialBoard(initialBoard){
	return {
		type: SET_INITIAL_BOARD,
		initialBoard
	};
}

export function setInitialized(initialized){
	return {
		type: SET_INITIALIZED,
		initialized
	};
}

export function loadState(state){
	return {
		type: LOAD_STATE,
		state
	}
}

export function doMove(direction){
	return {
		type: DO_MOVE,
		direction
	}
}

export function addTime(timeElapsed){
	return {
		type: ADD_TIME,
		timeElapsed
	}
}

export function setWon(hasWon){
	return {
		type: WON,
		hasWon
	}
}
