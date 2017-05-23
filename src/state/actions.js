export const SET_INITIAL_BOARD = "SET_INITIAL_BOARD";
export const SET_INITIALIZED = "SET_INITIALIZED";
export const LOAD_STATE = "LOAD_STATE";

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
