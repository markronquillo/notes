var React = require('react');

var { connect } = require('react-redux');

import Todo from 'Todo';

var TodoAPI = require('TodoAPI');


export class TodoList extends React.Component {
	render() {
		var { todos, searchText, showCompleted } = this.props.state;
		var renderTodos = () => {

			if (todos.length === 0) {
				return (
          <p className="container__message">Nothing To Do</p>
        );
			}

			return TodoAPI.filterTodos(todos, showCompleted, searchText).map((todo) => {
				return (
					<Todo key={todo.id} {...todo} />
				);
			});
		};

		return (
			<div>
				{renderTodos()}
			</div>
		)		
	}
}

function mapStateToProps(state) {
	return {
		state
	}
}

export default connect(mapStateToProps)(TodoList);
