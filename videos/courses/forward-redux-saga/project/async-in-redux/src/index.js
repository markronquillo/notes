import 'babel-polyfill';
import './index.css';
import React        from 'react';
import { render }   from 'react-dom';
import { Provider } from 'react-redux';
import store 		from 'store';
import App          from './components/app';

const Application = <Provider store={store}>
	<App />
</Provider>

render(<App />, document.getElementById('root'));
