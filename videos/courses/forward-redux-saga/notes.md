# Async Redux Workshop

## MODULE 1: Introduction

#### Redux

Manages state changes via pure functions and uni-directional data flow

Inspired by the Elm Architecture

When your Redux store state changes, your React views response with new data.

Removes business logic out of your React views.

#### Redux Middleware

A third-party extension point between dispatching an aciton and the moment it reaches the reducer.

Use currying to allow you to create custom dispatch functions (middleware) that are called sequentially in between dispatching and the reducer

Essentially, you can hook into the dispatcher with a chain of functions.

```javascript
export default store => next => action => {
	let result = next(action);
	if (process.env.NODE_ENV !== 'production') {
		console.log('dispatching', action);
		console.log('next state', store.getState())
	}
	return result;
}
```

#### Why Middleware?

We can keep the ease of debugging with Redux and build on top of that with middleware.

We can use the Redux store to track the state of async operations, but middleware manages opration of async operations.


#### Three states of any async operation

Pending: Operation is in progress. Useful for telling the user to stand by or to keep other requests in sync.

Fulfilled: Operation is finished. Update the UI or do some other operation.

Rejectted: Opration failed. Handle the failure in whatever way makes sense for your application.


#### Thunk Middleware

Normal actions are objects

redux-thunk allows you to dispatch a function which will be called by redux-thunk middleware.

#### Promise Middleware

Very similar to thunk middleware

Most redux promise middleware libraries are already FSA compliant.

Promises are in the language and are built for async.

Use pbrthchaell/redux-promise-middleware. It's the best one out there with good conventions.

#### RXJS

Reactive extensions for JS

If Function Reactive Programming (FRP) is your thing

#### Redux Saga

A redux implementation of the Saga pattern

Based on generators

Instead of dispatching Thunks, you create Sagas to gather all your Side Effects logic in a central place

This means application logic lives in 2 places:

- Reducers are responsible for handling state transitions between actions.
- Sagas are responsible for orchestrating complex/asynchronous operations.

#### Saga Pattern

Saga is a failure management pattern

Sagas are multiple workflows, each providing compensating actions for every step of the workflow where it can fail.

You can think of Sagas as daemons, a long living process for orchestrating transactions and handling recovery from failures.


## Module 2: Redux Crash Course

3 Redux parts

#### What is Redux?

Officially: redux is a predictable state container for JS apps. Basically it's a functional approach to managign state.

Designed with React in mind, but can be used with any rendering library.

```javascript

import { createStore } from 'redux';

function counterReducer(state = 0, action) {
	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
};

let store = createStore(counterReducer);

store.subscribe(() => {
	console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
store.getState();
```


#### 3 Parts of Redux

Part 1:

All the state of your application lives in just one single store in Redux

Single source of truth

THis makes it easy to serialize and debug your application

In practice, there is very little need for multiple stores

A good analogy is a simple JSON store

Getting the entire state is easy -- getState()

Part 2: Actions

State is read-only. Immutable

To change the state, you need to dispatch an "event" or "action" to the store.

Basically, actions describe what happened which the store figures out how to handle the action

This sticks to React's unidirectional data flow philosophy

To tell the store an action occurred, use 'dispatch()'

```javascript

store.dispatch({
	type: 'UPDATE_DESTINATIOn',
	payload: {
		newDestination: 'Sol'
	}
});

Store.dispatch({
	type: 'ENGAGE_WARP_DRIVE'
})
```

Part 3: Reducer

The store uses a reducer function to determine how to handle actions and update the state.

A reducer is a pure function with no side effects.

Reducer taks the current state and an action, then return the next state.


```javascript
function counterReducer(state = 0, action) {
	switch (action.type) {
		...
	}
}
```

## Module 3 Redux Middleware

Middleware is computer software that provides services to software applications beyond those available from operating system. It can be described as 'software glue'.

#### Implementation details

Redux chains together you provide, passing in special functions to your each middleware along the chain

It passes functions for functions getting the state, dispatching new actions, and calling the following middleware

It is the job of your middleware to know hwen it's finished and pass the action to the next middleware.

```javascript
import { applyMiddleware, createStore } from 'redux';
import logger from './middleware/logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const middleware = applyMiddleware(logger, thunk);

const store = createStore(rootReducer, middleware);

dexport default store
```

```javascript
export default store => next => action => {
	let result = next(action);
	...
	return result;
}
```

#### Currying

A curried function can accept some of it's arguments, returning a function that takes the remianing argumnents.

This is useful if you want to apply an argument to a function before you have the rest of the arguments it needs.

Redux uses currying to chain middleware before the store is created, and to pass in functions that don't quite exist yet.

#### Store

For all intents and purposes it's the actual Redux store.

It's not the actual store: rather it's an object that contains methdos from the store you might want to use

You get 2 functions from this store object: getState() and dispatch()

```javascript
var middlewareAPI = {
	getState: store.getState,
	dispatch: (action) => store.dispatch(action)
}
```

#### Next

next() is the next middleware in the chain of middlewares. Perhaps it should have been called nextMiddleware() for clarity.

Only your middleware knows when it's finished and hands over control of the action to the next middleware.


## Module 4: Async with Thunks and Promises

#### Thunk middleware

A thunk is a function that wraps an expression to delay its evaluation

#### Redux Thunk

Normal actions are objects

redux-thunk allows you to dispatch a function which will be called by redux-thunk middleware

redux-thunk will pass in dispatcher and getState functions so you can dispatch na action at the end of async dispatch.

#### FSA: Flux Standard Action

A set of standards for describing what an action look like.

If we can make assumptiosn about the structure of actions, we can build better abstractions on top of them.

Basically, action must be an object with a 'type' property.

Redux thunk dispatches functions, not FSA action objects.

```javascript
// FSA compliant
{
	type: MY_TYPE,
	error: true,
	payload: new Error()
}
```

#### Promise Middleware

Very similar to thunk middleware but better.

Most redux promise middleware


## Module 5: Generators and Redux Saga

#### Generators

Generators are functions which can be exited and later re-entered. Their context (variable bindings) will be saved acrossed re-entrances.

Generators have two parts: a generator function and generator object.

Generator objects have a `next()` method that returns on object with `value` and `done` attributes.

```javascript
function* idMaker() {
	var index = 0;
	while(index < 3)
		yield index++
}
```


```javascript
function* fibonacciGenerator(n) {
	let back2 = 0;
	let back1 = 1;
	let current = 0;
	for (let i=0; i < n - 1; ++i) {
		current = back1 + back2;
		back2 = back1;
		back1 = current;
		yield = current;
	}
	return current;
}

const fibonnacci = fibonacciGenerator(1000);

const interval = setInterval(() => {
	const result = fibonacci.next();
	if (result.done) {
		console.log('DONE');
		clearInterval(interval);
		return
	}
	console.log(result.value);
}, 0);
```


## Module 6:

#### Redux Saga

A Redux implementation of the Saga Pattern

Based on generators

Instead of dispatching Thunks, you create Sagas to gather all your Side Effects logic in a central place.

This means aplication logic lives in 2 places:
- Reducers are responsible for handling state transitions between actions.
- Sagas are responsible for orchestrating complex/asynchronous operations.

```javascript
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects'

function* fetchUser(action) {
	try { 
		const user = yield call(Api.fetchUser, action.payload.userId);
		yield put({type: 'USER_FETCH_SUCCEEDED', user: user});
	} catch (e) {
		yield put({type: 'USER_FETCH_FAILED', message: e.message});
	}
}

function* mySaga() {
	yield* takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function mySaga() {
	yield* takeLatest('USER_FETCH_REQUESTED', fetchUser);
}
```
