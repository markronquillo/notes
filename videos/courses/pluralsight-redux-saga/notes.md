## Introduction

#### What is Redux Saga?

Redux Middleware

Consumes actions, dispatches actions and side-effects.

Maintains continously running process called sagas

#### What is a Saga?

Sagas in functional programming: 
	- RESET: series of reversible transactions
	- replacs single, locking transaction
	- Uses a process manager to manage sub-processes

Sagas (in redux)
	- A long running background process
	- Responsible for application's side effects
	- Used in conjunction with ES6 yield
	- Redux Saga is the process manager

Sagas functionality
1. Listen for actions dispatches other actions, (using effects)


#### Why use Redux Saga?

Facilitates side-effects (API calls, database transactions) in your Redux application

Advanced tools (forking processed, yielding thread) cover alomost all real-world use cases

More sophisticated thatn Redux-Thunk

#### Redux Thunk Vs. Redux Saga

Redux Thunk
- Common redux middleware
- created by redux creator
- Runs in any JS context
- has no built-in solution fo async calls
- no way to orchestrate side-effects between thunks

Redux Saga
- common redux middleware
- created by third party developer
- only runs in ES6 environments that support Yield
- Uses yield and generator functions to simplify async
- redux saga uses effects and plain actions to coordiate sagas


##  Asynchronous ES6 and Yield

What is yield?
- Special keyword that can delay the execution of subsequent code
- only works inside generator functions

```javascript
api.call( url, function callback(data) {

});

api.call(url)
.then(data => {
	...
});

let data = yield api.call(myURL);
```

Advantages:
- Significant fewer lines of code
- Significant less indentation
- easiest to read quickly, reason about
- easier to debug
- executio nstops on unhandled error

Disadvantages
- only works inside Generator functions
- requires additional babel plugins
- errors must be handled explicitly
- unfamiliar to novice
- execution stops on unhandled error

#### Generator Function

Special JS function denoted by *
Calling function returns a generator 
Actual code is executed by next method


```javascript
function* getValue(a, b) {
	const value a + b;
	return a + b
}
let gen getVal(1, 2);
let data = gen.next().value();
```

#### Wrapping Generators

Yielded promise must still be called manually by some code

Redux Saga wraps generators automatically

Co.js can wrap generators outside of Redux-Saga app

```javascript
var delayGenerator function* () {
	let data1 = yield delay(1000, 1);
	console.info('Step 1');
	let data2 = yield delay(2000, 2);
	console.info('Step 2');
	let data3 = yield delay(3000, 3);
	console.info('Step 3');
}

var ob = delayGenerator();

run(delayGenerator);
var wrapped = co.wrap(delayGenerator);
```

## Redux Saga Effects

Understand effects - what are they, how they are used

REview all Redux-Saga effects and apply them in our application

Effects to be summarized: put, select, take, takeLatest, takeEvery, call, fork and others

Cancel will be used to stop running threads (and child threads);

#### Introductino to effects

Utility method provided by Redux Saga

Returns an object containing instructions for Redux Saga

Redux Saga generates the side effects, not the effect itself

. Thread management
	call, fork, spawn, apply, cancel
. Action creation
	put
. Data seeding
	select
.	Flow control
	take, takeEvery, takeLatest

#### Take

Pauses between concurrent lin of coces

Code resumes when specified action is dispatched

Only one thread -- multiple actions do not lead to multiple responses

Properties of action are passed as yielded variable

```javascript
effects.take('MY_ACTION')

let mySaga = function* () {
	console.info('Saga begins!')
	const state = yield effects.take('SET_STATE');
	console.info('Got state...', state);
}

run(mySaga);
```


#### Put

Immediately dispatches an action to the rest of the app

Code execution does not pause

Like calling dispatch in redux-thunkA

```javascript
let mySaga = function* () {
	console.info('Saga begins!')
	const state = yield effects.take('SET_STATE');
	console.info('Got state...', state);
}
run(mySaga);

let putSaga = function* () {
	yield effects.put({ type: 'SET_STATE', value: 42 });
}
run(putSaga);
```

#### Call 

Calls the specified method

Equivalent to invoking the method directly

```javascript
len fn = () => { console.log('called the function') }

let saga = function*() { yield fn() }

saga = function* () { yield effects.call(fn) }
```

#### Implementing Take, Call and Put 

currentUserSaga waits for GET_CURRENT_USER_INFO action with take

current user information only ever needs to be fetched once

Update current user status saga to call Redux Cart Server API

Use saga to put action containing returned information to the app

#### Fork

Invokes the specified method (like call)

Can't access yielded variables 

Caller continues without pausing execution.

If parent process errors or is cancelled, all forked processes are cancelled

`Finally` block of forked method is invoked during cancellation.

```javascript
function* fn() {
	while(true) {
		console.log('FN!')
		yield delay(1000);
	}
}

let saga = function* () {
	while(true) {
		yield effects.fork(fn);
		yield delay(500);
	}
}
run(saga)
```


