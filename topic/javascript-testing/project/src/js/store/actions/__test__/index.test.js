import * as actions from '../';
import * as actionTypes from '../actionTypes';

describe('actions', () => {

    test('addTodo action', () => {
        const value = actions.addTodo({
            task: "sample"
        });
        
        const result = {
            type: actionTypes.ADD_TODO,
            payload: {
                task: "sample"
            }
        }
        expect(value).toEqual(result);
    });

    test('editTodo action', () => {
        const value = actions.editTodo({
            task: "sample -- edited"
        });

        const result = {
            type: actionTypes.EDIT_TODO,
            payload: {
                task: "sample -- edited"
            }
        };
        expect(value).toEqual(result);
    })

    test('deleteTodo action', () => {
        const value = actions.deleteTodo({
            task: "sample -- to delete"
        });

        const result = {
            type: actionTypes.DELETE_TODO,
            payload: {
                task: "sample -- to delete"
            }
        };
        expect(value).toEqual(result);
    })
});