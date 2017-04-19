var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
	it('should exists', () => {
		expect(TodoApp).toExist();
	});

	it('should add todo to todos state on handleAddTodo', () => {
		var todoText = 'test text';
		var todoApp = TestUtils.renderIntoDocument(<TodoApp />);

		todoApp.setState({todos: []});
		todoApp.handleAddTodo(todoText);

		expect(todoApp.state.todos[0].text).toBe(todoText);
	});

	it('should toggle the state on handleToggle', () => {
		var todoApp = TestUtils.renderIntoDocument(<TodoApp />);

		var todo = { id: 1, text: 'sample', completed: false, completedAt: undefined};
		todoApp.setState({todos: [todo]});

		todoApp.handleToggle(todo.id);

		expect(todoApp.state.todos[0].completed).toBe(true);
		expect(todoApp.state.todos[0].completedAt).toBeA('number');
	});
});