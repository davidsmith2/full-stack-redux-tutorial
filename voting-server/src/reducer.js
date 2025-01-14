import {setEntries, next, vote, restart, INITIAL_STATE} from './core';

/**
 * A reducer - takes any kind of action and invokes the core function that matches the action
 */
export default function reducer(state = INITIAL_STATE, action) {
	switch(action.type) {
	case 'SET_ENTRIES':
		return setEntries(state, action.entries);
	case 'NEXT':
		return next(state);
	case 'VOTE':
		return state.update('vote', voteState => vote(voteState, action.entry));
	case 'RESTART':
		return restart(state);
	}
	return state;
}
