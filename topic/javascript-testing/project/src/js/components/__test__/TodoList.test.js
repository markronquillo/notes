import React from 'react';
import { shallow, mount } from 'enzyme';

import TodoList from '../TodoList';
import TodoItem from '../TodoItem';


describe("TodoList", () => {
    test('render empty list', () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.find(<TodoItem />).length).toEqual(0);
    });

    test('render todo list', () => {
        const todos = [
            { task: 'sample' },
            { task: 'sample 2' },
        ]
        const wrapper = mount(<TodoList todos={todos} deleteTodo={() => {} }/>);
        expect(wrapper.find('span.todo-item').length).toEqual(2);
    });
});