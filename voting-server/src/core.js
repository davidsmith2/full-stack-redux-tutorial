import {List, Map} from 'immutable';

/**
 * Returns the winner of a vote or both candidates if a tie
 */
function getWinners(vote) {
	if (!vote) return [];
	const [a, b] = vote.get('pair').toArray();
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);
	if (aVotes > bVotes) return [a];
	else if (aVotes < bVotes) return [b];
	else return [a, b];

}

/**
 * Updates list of current entries
 */
export function setEntries(state, entries) {
	return state.set('entries', List(entries));
}

/**
 * If there's a winner declares a winner otherwise sets up the next vote
 */
export function next(state) {
	const entries = state.get('entries').concat(getWinners(state.get('vote')));
	if (entries.size === 1) {
		return state.delete('vote')
					.delete('entries')
					.set('winner', entries.first());

	} else {
		return state.merge({
			vote: Map({pair: entries.take(2)}),
			entries: entries.skip(2)
		});
	}
}

/**
 * Increments vote's tally property using updateIn
 */
export function vote(voteState, entry) {
	return voteState.updateIn(
		['tally', entry],
		0,
		tally => tally + 1
	);
}

/**
 * Application must have initial state
 */
export const INITIAL_STATE = Map();
