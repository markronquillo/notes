var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');
describe('Reducers', () => {

	describe('searchTextReducer', () => {
		it('should set search text', () => {
			var action = {
				type: 'SET_SEARCH_TEXT',
				searchText: 'dog'
			};
			var res = reducers.searchTextReducer(df(''), df(action));

			expect(res).toEqual(action.searchText);
		})
	});

	describe('showCompletedReducer', () => {
		it('should toggle show completed', () => {
			var action = {
				type: 'TOGGLE_SHOW_COMPLETED',
			};
			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		})
	});

	describe('todosReducer', () => {
		it('should add todo', () => {
			var action = {
				type: 'ADD_TODO',
				text: 'Something todo'
			};
			var res = reducers.todosReducer(df([]), df(action));

			expect(res[0].text).toEqual(action.text);
			expect(res.length).toEqual(1);
		})

		it('should toggle todo', () => {
			var action = {
				type: 'TOGGLE_TODO',
				id: 1
			};
			var initialTodo = [{
				id: 1,
				text: 'Something',
				completed: false
			}, {
				id: 2,
				text: 'Must not be edited',
				completed: true
			}];
			var res = reducers.todosReducer(df(initialTodo), df(action));

			expect(res.length).toEqual(2);
			expect(res[0].id).toEqual(1);
			expect(res[0].completed).toEqual(true);
			expect(res[0].completedAt).toBeA('number');
		});

		it('should add existing todos', () => {
			var todos = [{
				text: 'test',
				id: '123',
				completed: false,
				completedAt: undefined,
				createdAt: 30
			}];
			var action = {
				type: 'ADD_TODOS',
				todos
			};

			var res = reducers.todosReducer(df([]), df(action));
			expect(res.length).toBe(1);
			expect(res[0]).toEqual(todos[0]);
		})
	});


});