import todosReducer from '../todosReducer';
import * as actions from '../../actions';


describe('TodosReducer', () => {
    test('add todo to list', () => {
       const initialState = [
           { id: 1, task: "sample", }
       ];
       const newTodo = { id: 2, task: "new todo" };
       const action = actions.addTodo(newTodo);
       const newState = todosReducer(initialState, action); const result = [
           { id: 1, task: "sample", },
           { id: 2, task: "new todo", }
       ];
       expect(newState).toEqual(result);
    });

    test('edit todo to list', () => {
       const initialState = [
           { id: 1, task: "sample", }
       ];
       const newTodo = { id: 1, task: "new todo" };
       const action = actions.editTodo(newTodo);
       const newState = todosReducer(initialState, action);
       const result = [
           { id: 1, task: "new todo", },
       ];
       expect(newState).toEqual(result);
    });

    test('delete todo to list', () => {
       const initialState = [
           { id: 1, task: "sample", }
       ];
       const todo = { id: 1 };
       const action = actions.deleteTodo(todo);
       const newState = todosReducer(initialState, action);
       const result = [];
       expect(newState).toEqual(result);
    });
});