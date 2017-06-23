import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions';

import Routes from '../Routes';


export class App extends Component {
    constructor(props) {
        super(props);
        this.goToAddTodo = this.goToAddTodo.bind(this);
    }

    goToAddTodo() {
        this.props.history.push('/add');
    }
    render() {
        return (
            <div> 
                <Routes {...this.props} goToAddTodo={this.goToAddTodo} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteTodo: (todo) => {
            dispatch(actions.deleteTodo(todo));
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
