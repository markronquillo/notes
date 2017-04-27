var React = require('react');

var { connect } = require('react-redux');

var actions = require('actions');


export class AddTodo extends React.Component {

	constructor(props) {
		super(props);
		this.state =  {
			todoText: ''
		}	

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.refs.todoText.value.length > 0) {
			this.props.dispatch(actions.addTodo(this.refs.todoText.value));
		}
		else {
			this.refs.todoText.focus();
		}

		this.refs.todoText.value = '';
	}

	render() {
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
}

export default connect()(AddTodo);

