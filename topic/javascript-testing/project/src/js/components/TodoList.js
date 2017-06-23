import React from 'react';

import TodoItem from './TodoItem';

const TodoList = ({ todos, deleteTodo, goToAddTodo}) => {
    return (
        <div>
            <h1>My Todos</h1>
            {todos && todos.map(todo => 
                <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} />)}
            <button onClick={goToAddTodo} >Add new</button>
        </div>
    )
};

export default TodoList;
