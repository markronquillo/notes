import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from './reducer';


describe('reducer', () => {

	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({Trainspotting: 1})
				})
			})
		};

		const nextState = reducer(initialState, action);

		expect(nextState).to.deep.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }	
			}
		}));
	});

	it('handles SET_STATE with plain JS payload', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: { Trainspotting: 1 }
				}
			}
		};

		const nextState = reducer(initialState, action);
		expect(nextState).to.deep.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('handles SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: { Trainspotting: 1 }
				}
			}
		};

		const nextState = reducer(undefined, action);

		expect(nextState).to.deep.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			} }));
	});


	it('handles VOTE by setting hasVoted', () => {
		const state = fromJS({
			vote: {
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});

		const action = { type: 'VOTE', entry: 'Trainspotting' };
		const nextState = reducer(state, action);

		expect(nextState.toJS()).to.deep.equal({
			vote: {
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			hasVoted: 'Trainspotting',
			roundVoted: 1
		});
	});

	it('does not set hasVoted for VOTE on invalid entry', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});

		const action = { type: 'VOTE', entry: 'Sunshine' };
		const nextState = reducer(state, action);

		expect(nextState).to.deep.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('removes hasVoted on SET_STATE if the round changes', () => {
		const initialState = fromJS({
			vote: {
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			hasVoted: 'Trainspotting'
		});

		const action = { 
			type: 'SET_STATE', 
			state: {
				vote: {
					round: 2,
					pair: ['Trainspotting', 'Slumdog Millionaire']
				}
			}
		};
		const nextState = reducer(initialState, action);

		expect(nextState.toJS()).to.deep.equal({
			vote: {
				round: 2,
				pair: ['Trainspotting', 'Slumdog Millionaire']
			}
		});
	});


	it('handles SET_HAS_VOTED', () => {
		const initialState = fromJS({
			vote: {
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 },
				votes: { 'voter1': 'Trainspotting' }
			},
		});

		const action = { 
			type: 'SET_HAS_VOTED', 
			clientId: 'voter1'
		};

		const nextState = reducer(initialState, action)	
		expect(nextState.toJS()).to.deep.equal({
			vote: {
				round: 1,
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 },
				votes: { 'voter1': 'Trainspotting' },
			},
			hasVoted: 'Trainspotting'
		});
	})

});