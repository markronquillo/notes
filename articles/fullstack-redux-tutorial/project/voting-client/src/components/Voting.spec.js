import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Voting from '../../src/components/Voting';

describe('Voting', () => {
    
    it('renders a pair of buttons', () => {
        const component = renderer.create(
            <Voting pair={["Trainspotting", "28 Days Later"]} />
        );
        expect(component).toMatchSnapshot();
    });
})
