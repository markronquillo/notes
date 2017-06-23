import todos from './todosReducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    todos
});

export default reducer;
