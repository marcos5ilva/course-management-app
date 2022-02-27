import * as type from '../actions/actionTypes';
import initialState from '../initialState';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}
export default function apiStatusReducer(
	state = initialState.apiCallsInProgress,
	action
) {
	if (action.type === type.BEGIN_API_CALL) {
		return state + 1;
	} else if (
		action.type === type.API_CALL_ERROR ||
		actionTypeEndsInSuccess(action.type)
	) {
		return state - 1;
	}
	return state;
}
