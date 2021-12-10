import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducers = combineReducers({
	courses: courses
});

export default rootReducers;
