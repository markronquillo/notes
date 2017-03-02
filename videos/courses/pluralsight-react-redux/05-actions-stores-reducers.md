Actions, Stores and Reducers
-----------------------------

Actions
Stores
Immutability
Reducers

#### Actions

```
rateCourse(rating) {
	return { type: RATE_COURSE, rating: rating }
}
```

Action Creator, convenience function


#### Redux Store

```
let store = createStore(reducer);

store.dispatch(action)
stores.subscribe(listener)
store.getState()
replaceReducer(nextReducer)
```

Theres no api in changing data directly in the Store.

#### Immutability

To change state, return a new object.

```
state = {
	name: 'Cory House',
	role: 'author'
}

state.role = 'admin'
return state
```

```
state = {
	name: 'Cory House',
	role: 'author'
}

return state = {
	name: 'Cory House',
	role: 'admin'
}
```

```
// note: include babel-polyfill, to use Object.assign
Object.assign(target, ...sources);

// note on the empty object the first parameter,
Object.assign({}, state, {role: 'admin'}); // THIS MAKES THE RETURN STATE ABOVE
```

#### Why Immutability?

Flux: state is mutated

Redux: state is immutated, -- clarity, performance, awesome sauce

- Clarity

Immutability means clarity because we are always sure that if in case the state changed, we know that _a_ reducer changed it.

- Performance

Immutability means performance because instead of manually checking each attribute in the state if it changed, we only need to verify if the object is the same.

- Awesome Sauce

Time travel debugging
Undo/Redo
Turn off individual actions
Play interactions back

#### Handling Immutability

ES6: Object.assign, Spread operator
ES5: Lodash merge, Lodash extend, Object-assign
Libraries: react-addons-update, Immutable.js

#### Reducers

```
function myReducer(state, aciton) {
	// return new_state;

	switch (action.type) {
		case "INCREMENT_COUNTER":
			return (Object.assign({}, state, 
				{counter: state.counter + 1}));
	}
}
```

Reducers must be pure functions.

Forbidden in Reducers: Mutate arguments, Perform side effects, Call non-pure functions.

1 Store and Multiple Reducers.

All Reducers are called on each dispatch.

Reducer = "Slice" of State

Write independent small reducer functions that are each responsible for updates to a specific slice of state. We call this pattern "reducer composition". A given action could be handled by all, some, or none of them.

#### Summary

Actions
- Represent user intent like create course,
- must have a type

Store
- simple api
- dispatch, subscribe, getState

Immutability
- Just return a new copy

Reducers 
- must be pure
- multiple per app, each reducer can manage/update a part of the Store
- slice of state



