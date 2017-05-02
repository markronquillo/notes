var expect = require('expect');
var actions = require('actions');

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

var createMockStore = configureMockStore([thunk]);

import firebase, { firebaseRef } from 'app/firebase/';

describe('Actions', () => {
	it('should generate search text action', () => {
		var action = {
			type: 'SET_SEARCH_TEXT',
			searchText: 'Some search text'
		};

		var res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it('should generate add todo action', () => {
		var action = {
			type: 'ADD_TODO',
			todo: { text: 'Thing to do' }
		};

		var res = actions.addTodo(action.todo);

		expect(res).toEqual(action);
	});

	it('should generate add todos action', () => {
		var action = {type: 'ADD_TODOS',
			todos: [{text: 'test'}, {text: 'test2'}]
		};

		var res = actions.addTodos(action.todos);

		expect(res).toEqual(action);
	});

	it('should create and dispatch ADD_TODO', (done) => {
		const store = createMockStore({});
		const todoText = 'My todo item';

		store.dispatch(actions.startAddTodo(todoText)).then(() => {
			const actions = store.getActions();
			expect(actions[0]).toInclude({ type: 'ADD_TODO' });
			expect(actions[0].todo).toInclude({ text: todoText });
			done();
		}).catch(done);
	});


	it('should generate toggle show completed action', () => {
		var action = {
			type: 'TOGGLE_SHOW_COMPLETED',
		};

		var res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it('should generate update todo action', () => {
		var action = {
			type: 'UPDATE_TODO',
			id: 123,
			updates: {
				text: 'test'
			}
		};

		var res = actions.updateTodo(action.id, action.updates);
		expect(res).toEqual(action);
	});


	describe('Tests with firebase todos', () => {
		var testTodoRef;

		beforeEach((done) => {

			var todosRef = firebaseRef.child('todos');

			todosRef.remove().then(() => {
				testTodoRef = firebaseRef.child('todos').push();

				testTodoRef.set({
					text: 'Something to do',
					completed: false,
					createdAt: 500
				})
			})
			.then(() => done())
			.catch(done);
		});

		afterEach((done) => {
			testTodoRef.remove().then(() => done());
		});

		it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
			const store = createMockStore({});
			const action = actions.startToggleTodo(testTodoRef.key, true);

			store.dispatch(action).then(() => {
				const mockActions = store.getActions();

				expect(mockActions[0]).toInclude({
					type: 'UPDATE_TODO',
					id: testTodoRef.key,
				});

				expect(mockActions[0].updates).toInclude({
					completed: true
				});

				expect(mockActions[0].updates.completedAt).toExist();

				done();
			}, done);
		});
	});
});