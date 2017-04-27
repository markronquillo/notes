var redux = require('redux');
var { 
	searchTextReducer,
	showCompletedReducer,
	todosReducer
} = require('reducers');


export var configure = (initial = {}) => {
	var reducer = redux.combineReducers({
		searchText: searchTextReducer,
		showCompleted: showCompletedReducer,
		todos: todosReducer
	});

	var store = redux.createStore(reducer, initial, redux.compose(
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store; 
}
