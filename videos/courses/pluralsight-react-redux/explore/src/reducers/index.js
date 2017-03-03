import { combineReducers } from 'redux';
import courses from './courseReducer';

const reducers = combineReducers({
	courses
});

export default reducers;
