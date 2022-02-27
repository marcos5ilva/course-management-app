import * as type from '../actions/actionTypes';
import initialState from '../initialState';

export default function courseReducer(state = initialState.courses, action) {
	switch (action.type) {
		case type.CREATE_COURSE_SUCCESS:
			return [...state, { ...action.course }];
		case type.UPDATE_COURSE_SUCCESS:
			return state.map(course =>
				course.id === action.course.id ? action.course : course
			);
		case type.LOAD_COURSES_SUCCESS:
			return action.courses;
		default:
			return state;
	}
}
