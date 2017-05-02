import * as redux from 'redux';

import thunk from 'redux-thunk';

import { 
	searchTextReducer,
	showCompletedReducer,
	todosReducer
} from 'reducers';


export var configure = (initial = {}) => {
	var reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer
	});

	var store = redux.createStore(reducer, initial, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store; 
}
