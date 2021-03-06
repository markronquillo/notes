var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var { Todo } = require('Todo');

describe('Todo', () => {
	it('should exists', () => {
		expect(Todo).toExist();
	});

	it('it should dispatch TOGGLE_TODO on click', () => {
		var todoData = {
			id: 111,
			text: 'sample',
			completed: false
		};
		var spy = expect.createSpy();
		var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);
		var $el = $(ReactDOM.findDOMNode(todo));
		TestUtils.Simulate.click($el[0]);

		expect(spy).toHaveBeenCalled();
	});
});