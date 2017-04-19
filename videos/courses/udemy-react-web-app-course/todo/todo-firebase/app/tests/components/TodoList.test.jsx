var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
	it('should exists', () => {
		expect(TodoList).toExist();
	});

	it('should render Todo comonent for each todo item', () => {
		var todos = [{
			id: 1,
			text: 'Do something'
		}, {
			id: 2,
			text: 'Do something 2'
		}];

		var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

		expect(todosComponents.length).toBe(todos.length);
	});


});