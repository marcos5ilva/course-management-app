import * as type from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
	switch (action.type) {
		case type.CREATE_COURSE:
			return [...state, { ...action.course }];
		default:
			return state;
	}
}
