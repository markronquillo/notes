import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Voting from '../../src/components/Voting';

// chai.use(chaiEnzyme());

describe('Voting', () => {
    
    it('renders a pair of buttons', () => {
        const component = shallow(
            <Voting pair={["Trainspotting", "28 Days Later"]} />
        );
        const buttons = component.find('button');

        expect(buttons).to.have.length(2);
        expect(buttons.at(0).text()).to.contain('Trainspotting');
        expect(buttons.at(1).text()).to.contain('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        const onButtonClick = sinon.spy();
        const component = shallow(
            <Voting pair={["Trainspotting", "28 Days Later"]} 
                vote={onButtonClick} />
        );
        const button = component.find('button').at(0);
        button.simulate('click');
        expect(onButtonClick).to.have.property('callCount', 1);
    });
})
