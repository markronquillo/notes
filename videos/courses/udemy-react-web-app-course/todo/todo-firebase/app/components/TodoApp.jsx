var uuid = require('node-uuid');
var moment = require('moment');

var React = require('react');

var { connect } = require('react-redux');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
	render: function() {
		return (
			<div>
				<h1 className="page-title"> Todo </h1>
				<div className="row">
					<div className="column small-centered small-11 medium-6 large-5">
						<div className="container">
							<TodoSearch />
							<TodoList />
							<AddTodo />
						</div>
					</div>
				</div>
			</div>
		);
	}
});


export default TodoApp;
