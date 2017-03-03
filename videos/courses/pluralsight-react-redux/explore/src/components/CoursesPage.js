import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as courseActions from '../actions/courseActions';


class CoursesPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			course: {
				title: ''
			}
		};

		this.onTitleChange = this.onTitleChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
	}

	onTitleChange(event) {
		const course = this.state.course;
		course.title = event.target.value;
		this.setState({course: course});
	}

	onSaveClick(event) {
		this.props.actions.createCourse(this.state.course);
	}

	createCourseRow(course, index) {
		return (
			<div key={index}>{course.title}</div>
		);
	}

	render() {
		return (
			<div>
				<div>
					{this.props.courses.map(this.createCourseRow)}
				</div>

				<p>
					<input type="text" 
							onChange={this.onTitleChange} 
							value={this.state.course.title} />

					<input type="submit"
						onClick={this.onSaveClick}
						value="Save" />
				</p>
			</div>
		);
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired
}

// assumption, that inside connect when mapStateToProps is called, it passes the store.getState()
// and thus having an access to the store's state
function mapStateToProps(state, ownProps) {
	return {
		courses: state.courses
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(courseActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
