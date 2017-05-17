import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import { List, Map } from 'immutable';

import Results from './Results';

describe('Results', () => {

	it('renders entries with vote counts or zero', () => {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Transpotting': 5});
		const component = shallow(
			<Results pair={pair} tally={tally} />
		);

		const entries = component.find('.entry');
		const [train, days] = entries.map(e => e.text());

		console.log(entries);
	})
});