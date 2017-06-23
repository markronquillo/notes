import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import { App } from '../App';

function setup() 
{
    return shallow(<App />);
}

describe('App', () => {
    test('display correct html', () => {
        const wrapper = setup();
    });
});
