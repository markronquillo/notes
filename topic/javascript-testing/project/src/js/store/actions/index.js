import * as actionTypes from './actionTypes';

export function addTodo(todo) {
    return {
        type: actionTypes.ADD_TODO,
        payload: todo
    };
}

export function editTodo(todo) {
    return {
        type: actionTypes.EDIT_TODO,
        payload: todo
    };
}

export function deleteTodo(todo) {
    return {
        type: actionTypes.DELETE_TODO,
        payload: todo
    };
}

