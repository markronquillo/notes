import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { setState } from './action_creators';

import io from 'socket.io-client';

import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import VotingContainer from './components/Voting';
import ResultsContainer from './components/Results';


const socket = io(`${location.protocol}//${location.hostname}:8090`);

// we listen to the `state` changes
// and updates our local copy of the state
socket.on('state', state => {
	console.log(state);
	store.dispatch(setState(state));
});

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
	<Route path="/results" component={ResultsContainer} />
	<Route path="/" component={VotingContainer} />
</Route>

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>{routes}</Router>
	</Provider>,
  document.getElementById('root')
);

