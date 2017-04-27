var React = require('react');

var { connect } = require('react-redux');

var actions = require('actions');

export class TodoSearch  extends React.Component {

	constructor(props) {
		super(props);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleSearch() {
		var searchText = this.refs.searchText.value;
		this.props.dispatch(actions.setSearchText(searchText));
	}

	handleToggle() {
		var showCompleted = this.refs.showCompleted.checked;
		this.props.dispatch(actions.toggleShowCompleted());
	}

	render() {
		return (
			<div className="container__header">
				<div>
					<input type="search" ref="searchText" 
						placeholder="Search todos"
						onChange={this.handleSearch} />
				</div>
				<div className="container__checkbox_wrapper">
					<label>
						<input type="checkbox" ref="showCompleted"
							onChange={this.handleToggle} />
						Show completed todos
					</label>
				</div>
			</div>
		)
	}
}

export default connect()(TodoSearch);
