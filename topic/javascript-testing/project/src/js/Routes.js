import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import TodoList from './components/TodoList';
import AppliedRoute from './components/AppliedRoute';
import AddTodo from './components/AddTodo';

export default (props) => (
    <Switch>
        <AppliedRoute path="/" exact component={TodoList} props={props} />
        <AppliedRoute path="/add" exact component={AddTodo} props={props} />
    </Switch>
);
