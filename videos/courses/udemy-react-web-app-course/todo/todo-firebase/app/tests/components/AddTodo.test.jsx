var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
	it('should exists', () => {
		expect(AddTodo).toExist();
	});

	it('should call handleAddTodo prop with valid data', () => {
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo handleAdd={spy} />);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = 'Check mail';
		
		TestUtils.Simulate.submit($el.find('form')[0]);
		expect(spy).toHaveBeenCalled();
	});

	it('should call handleAddTodo prop with invalid data', () => {
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddTodo handleAdd={spy} />);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = '';
		TestUtils.Simulate.submit($el.find('form')[0]);
		expect(spy).toNotHaveBeenCalled();
	});
});