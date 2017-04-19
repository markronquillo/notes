var React = require('react');

var AddTodo = React.createClass({

	getInitialState: function() {
		return {
			todoText: ''
		}	
	},

	handleSubmit: function(e) {
		e.preventDefault();
		if (this.refs.todoText.value.length > 0) {
			this.props.handleAdd(this.refs.todoText.value);
		}
		else {
			this.refs.todoText.focus();
		}

		this.refs.todoText.value = '';
	},

	render: function() {
		return (
			<div className="container__footer">
				<form onSubmit={this.handleSubmit}>
					<input type="text" 
						ref="todoText"
						placeholder="What do you need to do?"
						/>
					<button className="button expanded" type="submit" >	Add Todo </button>
				</form>
			</div>
		)	
	}
});

module.exports = AddTodo;

