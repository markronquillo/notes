var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var actions = require('actions');

import { TodoSearch } from 'TodoSearch';

describe('TodoSearch', () => {
	it('should exists', () => {
		expect(TodoSearch).toExist();
	});

	it('should dispatch SET_SEARCH_TEXT action', () => {
		var searchText = 'Dog';
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);
		var $el = $(ReactDOM.findDOMNode(todoSearch));
		todoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(todoSearch.refs.searchText);

		expect(spy).toHaveBeenCalledWith({
			type: 'SET_SEARCH_TEXT',
			searchText
		});
	});

	it('should call TOGGLE_SHOW_COMPLETED action upon changing the checkbox value', () => {
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

		todoSearch.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(todoSearch.refs.showCompleted);

		expect(spy).toHaveBeenCalledWith({
			type: 'TOGGLE_SHOW_COMPLETED'
		});
	});

});