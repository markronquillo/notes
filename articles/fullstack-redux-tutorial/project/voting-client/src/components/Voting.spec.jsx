import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { List } from 'immutable';

import { Voting } from '../../src/components/Voting';
import Vote from '../../src/components/Vote';
import Winner from '../../src/components/Winner';

// chai.use(chaiEnzyme());

describe('Voting', () => {
    
    it('renders a pair of buttons', () => {
        const component = shallow(
            <Vote pair={["Trainspotting", "28 Days Later"]} />
        );
        const buttons = component.find('button');

        expect(buttons).to.have.length(2);
        expect(buttons.at(0).text()).to.contain('Trainspotting');
        expect(buttons.at(1).text()).to.contain('28 Days Later');
    });

    it('invokes callback when a button is clicked', () => {
        // const onButtonClick = sinon.spy();
        let votedWith;
        const onButtonClick = (entry) => votedWith = entry;
        const component = shallow(
            <Vote pair={["Trainspotting", "28 Days Later"]} 
                vote={onButtonClick} />
        );
        const button = component.find('button').at(0);
        button.simulate('click');
        // expect(onButtonClick).to.have.property('callCount', 1);
        expect(votedWith).to.be.equal('Trainspotting');
    });

    it('disables button when already voted', () => {
        const component = shallow(
            <Vote pair={["Trainspotting", "28 Days Later"]} 
                hasVoted={'Trainspotting'} />
        );
        const button1 = component.find('button').at(0);
        const button2 = component.find('button').at(1);
        expect(button1.prop('disabled')).to.be.true;
        expect(button2.prop('disabled')).to.be.true;
    });

    it('adds label to the voted entry', () => {
       const component = shallow(
            <Vote pair={["Trainspotting", "28 Days Later"]} 
                hasVoted={'Trainspotting'} />
        );
        const button1 = component.find('button').at(0);
        expect(button1.text()).to.contains('Voted');
    });

    it('shows the winner', () => {
        const component = shallow(
            <Voting pair={["Trainspotting", "28 Days Later"]} 
                winner={'28 Days Later'} />
        );
        const winner = component.find(Winner).shallow();
        expect(winner.text()).to.be.equal('Winner is 28 Days Later.');
    });

    it('renders as a pure component', () => {
        const pair = List.of('Trainspotting', '28 Days Later');
        const container = document.createElement('div');
        let component = shallow(
            <Vote pair={pair} />,
            container
        );
        let firstButton = component.find('button').at(0); 
        expect(firstButton.text()).to.equal('Trainspotting');

        let newPair = pair.set(0, 'Sunshine');
        component = shallow(
            <Vote pair={newPair} />,
            container
        );
        firstButton = component.find('button').at(0); 
        expect(firstButton.text()).to.equal('Sunshine');
    });
})
