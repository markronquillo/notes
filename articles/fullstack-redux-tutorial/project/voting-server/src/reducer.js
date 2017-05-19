import {setEntries, next, vote, register, reset, INITIAL_STATE} from './core';
import { Map } from 'immutable';

export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return state.update('vote', voteState => vote(voteState, action.entry, action.clientId))
        case 'REGISTER':
            return register(state, action.clientId);
        case 'RESET':
            return next(reset(state));
    }
    return state;
}

