import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducers/index'


import CoursesPage from './components/CoursesPage';
import './index.css';

const store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
  	<CoursesPage />
  </Provider>,
  document.getElementById('root')
);
