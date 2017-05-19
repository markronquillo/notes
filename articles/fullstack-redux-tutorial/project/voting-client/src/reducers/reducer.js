import { List, Map } from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}

function vote(state, entry) {
	const currentPair = state.getIn(['vote', 'pair']);
	if (currentPair && currentPair.includes(entry)) {
		return state.set('hasVoted', entry)
						.set('roundVoted', state.getIn(['vote', 'round']))
	} else {
		return state;
	}
}

function resetVote(state) {
	const hasVoted = state.get('hasVoted');
	const roundVoted = state.get('roundVoted');
	const currentPair = state.getIn(['vote', 'pair'], List());
	if (hasVoted && 
		roundVoted != state.getIn(['vote', 'round'])) {
		return state.remove('hasVoted').remove('roundVoted');
	} else {
		return state;
	}
}

function setHasVoted(state, clientId) {

	if (!state.has('hasVoted')) {
		const votesState = state.getIn(['vote', 'votes']);
		if (votesState.has(clientId)) {
			return state.set('hasVoted', votesState.get(clientId));
		}
	}
	return state
}

export default function(state = Map(), action) {
	switch (action.type) {
		case 'SET_STATE':
			return resetVote(setState(state, action.state));
		case 'SET_HAS_VOTED':
			return setHasVoted(state, action.clientId);
		case 'SET_CLIENT_ID':
			return state.set('clientId', action.clientId);
		case 'VOTE':
			return vote(state, action.entry);
	}
	return state;
}