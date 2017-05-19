import {List, Map} from 'immutable';

function getWinners(vote) {
    if(!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if      (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else                      return [a, b];
}

export const INITIAL_STATE = Map();

/*
 * Given a state tree, set the immutable 
 * entries list
 */
export function setEntries(state, entries) {
    return state.set('entries', List(entries))
                .set('initialEntries', List(entries));
}

/*
 * Gets the first two for the current voting pair
 * Removes it from the entries
 */
export function next(state) {
    const entries = state.get('entries')
                        .concat(getWinners(state.get('vote')));

    if (entries.size == 1) {
        return state.remove('vote')
                    .remove('entries')
                    .remove('votes')
                    .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({
                round: state.getIn(['vote', 'round'], 0) + 1,
                pair: entries.take(2),
                votes: Map(),
            }),
            entries: entries.skip(2),
        });
    }
}

/**
 *  Checks if the clientId has already voted
 *  and removes its vote.
 */
function removeVote(voteState, entry, clientId) {
    const vote = voteState.getIn(['votes', clientId]);
    if (vote) {
        return voteState.updateIn(['tally', vote], 0, tally => tally - 1)
                .removeIn(['votes', clientId]);
    }
    return voteState;
}

/**
 *  Remove the vote if it has already voted for this pair
 *  then applies the vote again with the entry.
 */
export function vote(voteState, entry, clientId) {
    voteState = removeVote(voteState, entry, clientId);
    if (voteState.get('pair').includes(entry)) {
        return voteState.updateIn(
            ['tally', entry],
            0,
            tally => tally + 1
        )
        .update('votes', votes => votes.set(clientId, entry));
    }
    return voteState;
}


export function reset(state) {
    return state.remove('winner')
                .set('entries', List(state.get('initialEntries')))
}
