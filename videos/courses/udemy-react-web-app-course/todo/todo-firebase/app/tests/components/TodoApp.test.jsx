var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var { Provider } = require('react-redux');

var expect = require('expect');
var $ = require('jquery');

var configureStore = require('configureStore');

import TodoApp from 'TodoApp';
import TodoList from 'TodoList';


describe('TodoApp', () => {
	it('should exists', () => {
		expect(TodoApp).toExist();
	});

	it('should render todo list', () => {
		var store = configureStore.configure({
			todos: [],
			searchText: '',
			showCompleted: true
		});
		var provider = TestUtils.renderIntoDocument(
			<Provider store={store}>
				<TodoApp />
			</Provider>
		);

		var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
		var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

		expect(todoList.length).toBe(1);
	});
});