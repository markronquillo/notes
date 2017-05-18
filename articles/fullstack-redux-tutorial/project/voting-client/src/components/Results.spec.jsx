import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { List, Map } from 'immutable';

import { Results } from './Results';

describe('Results', () => {

	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Trainspotting': 5});
		const component = shallow(
			<Results pair={pair} tally={tally} />
		);

		const entries = component.find('.entry');
		const [train, days] = entries.map(e => e.text());
		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('5');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});

	it('invokes the next callback when next button is clicked', () => {
		const onHandleClick = sinon.spy();
		const pair = List.of('Trainspotting', '28 Days Later');
		const component = shallow(
			<Results pair={pair} tally={Map()} next={onHandleClick} />
		);
		const button = component.find('.next');
		button.simulate('click');
		expect(onHandleClick).to.have.property('callCount', 1);
	});

	it('renders the winner when there is one', () => {
		const component = mount(
			<Results winner="Trainspotting"
								pair={["Trainspotting", "28 Days Later"]}
								tally={Map()} />
		);
		const winner = component.find('.winner');
		expect(winner).to.be.ok;
		expect(winner.text()).to.contain('Trainspotting');
	})
});