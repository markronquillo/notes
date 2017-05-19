import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router, hashHistory } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import { setState, setIfHasVoted } from './action_creators';

import io from 'socket.io-client';

import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import VotingContainer from './components/Voting';
import ResultsContainer from './components/Results';

import { getUserId} from './helpers';
import { setClientId } from './action_creators';


const socket = io(`${location.protocol}//${location.hostname}:8090`);

// we listen to the `state` changes
// and updates our local copy of the state
socket.on('state', state => {
	console.log(state);
	store.dispatch(setState(state));
	store.dispatch(setIfHasVoted(getUserId()))
});


const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

store.subscribe((state) => {
	console.log(state);
});

store.dispatch(setClientId(getUserId()));

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

