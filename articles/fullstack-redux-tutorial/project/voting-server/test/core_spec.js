import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';


describe('application logic', () => {
    describe('setEntries', () => {
        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 Days Later');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later'),
                initialEntries: List.of('Trainspotting', '28 Days Later')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later'),
                initialEntries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    round: 1,
                    pair: List.of('Trainspotting', '28 Days Later'),
                    votes: Map()
                }),
                entries: List.of('Sunshine'),
            }));
        });

        it('puts winner of current vote back to entries', () => {
            const state = Map({
                vote: Map({
                    round: 1,
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours'),
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    round: 2,
                    pair: List.of('Sunshine', 'Millions'),
                    votes: Map()
                }),
                entries: List.of('127 Hours', 'Trainspotting'),
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    round: 1,
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 3,
                        '28 Days Later': 3
                    })
                }),
                entries: List.of('Sunshine', 'Millions', '127 Hours')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    round: 2,
                    pair: List.of('Sunshine', 'Millions'),
                    votes: Map()
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later'),
            }));
        });

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    round: 1,
                    pair: List.of('Trainspotting', '28 DaysLater'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                winner: 'Trainspotting'
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                votes: Map()
            });
            const nextState = vote(state, 'Trainspotting', 'voter1');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                }),
                votes: Map({ 'voter1': 'Trainspotting' })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                }),
                votes: Map()
            });
            const nextState = vote(state, 'Trainspotting', 'voter1');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                }),
                votes: Map({'voter1': 'Trainspotting'})
            }));
        });

        it('does not allow voted entry not included in the pair', () => {
             const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });
            const nextState = vote(state, 'Sunshine');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            }));
        });

        it('reassigns vote when the user changes vote during in the same pair', () => {
             const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                }),
                votes: Map()
            });
            const nextState = vote(state, 'Trainspotting', 'voter1');
            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                }),
                votes: Map({'voter1': 'Trainspotting'})
            }));

            const finalState = vote(nextState, '28 Days Later', 'voter1');
            expect(finalState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 3 
                }),
                votes: Map({'voter1': '28 Days Later'})
            }));
        });
    });
});
