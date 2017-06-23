import React from 'react';

import { shallow } from 'enzyme';
import TodoItem from '../TodoItem';


describe('TodoItem', () => {
    test('renders a todo item', () => {
        const todo = {
            task: 'task 1'
        };
        const wrapper = shallow(<TodoItem todo={todo} />);
        expect(wrapper.find('span.todo-item').text()).toBe('task 1');
    });
})