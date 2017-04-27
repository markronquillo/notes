var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import { configure } from 'configureStore';
import ConnectedTodo, { Todo } from 'Todo';
import ConnectedTodoList, { TodoList } from 'TodoList';

describe('TodoList', () => {
	it('should exists', () => {
		expect(TodoList).toExist();
	});

	it('should render Todo component for each todo item', () => {
		var todos = [{
			id: 1,
			text: 'Do something',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}, {
			id: 2,
			text: 'Do something 2',
			completed: false,
			completedAt: undefined,
			createdAt: 500
		}];

		var store = configure({todos})
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}> 
				<ConnectedTodoList />
			</Provider>
		);
		var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
		var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

		expect(todosComponents.length).toBe(todos.length);
	});

	it('should render empty message if no todos', () => {
		var todos = [];
		var store = configure({
			todos,
			searchText: '',
			showCompleted: true
		})
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}> 
				<ConnectedTodoList />
			</Provider>
		);
    var $el = $(ReactDOM.findDOMNode(provider));

    expect($el.find('.container__message').length).toBe(1);
	});
});