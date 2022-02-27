import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export function loadCourseSuccess(courses) {
	return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
	return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
	return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
	return function (dispatch) {
		return courseApi
			.getCourses()
			.then(courses => {
				dispatch(loadCourseSuccess(courses));
			})
			.catch(error => {
				throw error;
			});
	};
}

// eslint-disable-next-line no-unused-vars
export function saveCourse(course, getState) {
	return function (dispatch) {
		return courseApi
			.saveCourse(course)
			.then(savedCourse => {
				savedCourse.id
					? dispatch(updateCourseSuccess(savedCourse))
					: dispatch(createCourseSuccess(savedCourse));
			})
			.catch(error => {
				throw error;
			});
	};
}
