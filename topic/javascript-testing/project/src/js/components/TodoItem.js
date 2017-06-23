import React, { Component } from 'react';


const TodoItem = ({todo, deleteTodo}) => {

    const handleDeleteTodoClick = () => {
        deleteTodo(todo);
    }

    return (
        <div>
            <span className="todo-item">
                { todo.task }
            </span>
            <button onClick={handleDeleteTodoClick} >x</button>
        </div>    
    )
}

export default TodoItem;