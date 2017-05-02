var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoAPI = require('TodoAPI');

var actions = require('actions');
var store = require('configureStore').configure();

import TodoApp from 'TodoApp';

store.subscribe(() => {
	var state = store.getState();

	console.log('New State ', state);

	TodoAPI.setTodos(state.todos);
});

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>,
  document.getElementById('app')
);
