import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';

export function createCourseSuccess(course) {
	return { type: types.CREATE_COURSE_SUCCESS, course }; 
}

export function updateCourseSuccess(course) {
	return { type: types.UPDATE_COURSE_SUCCESS, course }; 
}

export function loadCourseSuccess(courses) {
	return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
	return function(dispatch) {
		return courseApi.getAllCourses().then(courses => {
			dispatch(loadCourseSuccess(courses));
		}).catch(error => {
			throw(error);
		});
	};
}


export function saveCourse(course) {
	return function (dispatch, getState) {
		return courseApi.saveCourse(course).then(course => {
			course.id ? dispatch(updateCourseSuccess(course)) :
				dispatch(createCourseSuccess(course));
		}).catch(error => {
			throw(error);
		});
	};
}