var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var { Provider } = require('redux');
var expect = require('expect');
var $ = require('jquery');

import { AddTodo } from 'AddTodo';

describe('AddTodo', () => {
	it('should exists', () => {
		expect(AddTodo).toExist();
	});

	it('should dispatch ADD_TODO action', () => {
		var spy = expect.createSpy();
		var todo = {
			text: 'Check mail',
			completed: false	
		}
		var addTodo = TestUtils.renderIntoDocument(
			<AddTodo dispatch={spy} />
		);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = 'Check mail';
		
		TestUtils.Simulate.submit($el.find('form')[0]);
		expect(spy).toHaveBeenCalled();
	});

	it('should not dispatch ADD_TODO action if invalid data', () => {
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(
			<AddTodo dispatch={spy} />
		);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		addTodo.refs.todoText.value = '';
		TestUtils.Simulate.submit($el.find('form')[0]);
		expect(spy).toNotHaveBeenCalled();
	});
});