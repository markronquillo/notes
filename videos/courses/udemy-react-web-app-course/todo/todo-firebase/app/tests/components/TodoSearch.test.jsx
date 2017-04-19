var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
	it('should exists', () => {
		expect(TodoSearch).toExist();
	});

	it('should call handleAddTodo prop with valid data', () => {
		var searchText = 'Dog';
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);
		var $el = $(ReactDOM.findDOMNode(todoSearch));
		todoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(todoSearch.refs.searchText);
		expect(spy).toHaveBeenCalled(false, 'Dog');
	});

	it('should call handleAddTodo prop with proper checked value', () => {
		var searchText = 'Dog';
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy} />);

		todoSearch.refs.showCompleted.checked = true;

		TestUtils.Simulate.change(todoSearch.refs.showCompleted);
		expect(spy).toHaveBeenCalled(false, 'Dog');
	});

});