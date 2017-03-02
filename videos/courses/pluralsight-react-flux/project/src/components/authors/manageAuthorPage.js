"use strict";


var React = require('react');
var Router = require('react-router');
var toastr = require('toastr');

var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');

var ManageAuthorPage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function(transition, component) {
			console.log(component);
			if (component.state.dirty && !confirm('Leave without saving?'))	 {
				transition.abort();
			}
		}
	},

	getInitialState: function() {
		return {
			author: {id: '', firstName: '', lastName: ''},
			errors: {},
			dirty: false
		};
	},

	setAuthorState: function(event) {
		this.setState({dirty: true});

		var field = event.target.name;
		var value = event.target.value;
		this.state.author[field] = value;
		return this.setState({author: this.state.author});
	},

	authorFormIsValid: function() {
		var formIsValid = true;
		this.state.errors = {};

		if (this.state.author.firstName.length < 3) {
			this.state.errors.firstName = 'First name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.author.lastName.length < 3) {
			this.state.errors.lastName = 'Last name must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({errors: this.state.errors});
		return formIsValid;
	},

	saveAuthor: function(event) {
		event.preventDefault();

		if (!this.authorFormIsValid()) {
			return;
		}

		if (this.state.author.id) {
			AuthorActions.updateAuthor(this.state.author);
		}
		else {
			AuthorActions.createAuthor(this.state.author);
		}

		this.setState({dirty: false});
		toastr.success('You have successfully added a new author.');
		this.transitionTo('authors');
	},

	componentWillMount: function() {
		var authorId = this.props.params.id;

		if (authorId) {
			this.setState({author: AuthorStore.getAuthorById(authorId)});
		}
	},

	render: function() {
		return (
			<div>
				<AuthorForm 
					author={this.state.author} 
					onChange={this.setAuthorState} 
					errors={this.state.errors}
					onSave={this.saveAuthor}/>	
			</div>
		);
	}
});

module.exports = ManageAuthorPage;