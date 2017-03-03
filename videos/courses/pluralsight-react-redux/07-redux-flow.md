Redux Flow
----------

Simple create course form
Actions
Action Creators
Store
Reducers
Container Components



We made a src/components/course/CoursesPage.js

We learned about binding the context in a method `this.onTitleChange = this.onTitleChange.bind(this)`

We made our first action src/actions/courseActions.js

```
export function createCourse(course) {
	return { type: 'CREATE_COURSE', course };
}

```

We handle actions with Reducers. A Reducer is just a function that accepts a state and an action then returns a new state.


We need to use a Provider component from 'react-redux', higher order component that attaches the store to our components.
 
#### Container Structure Review

Container Component

- constructor

- child functions

- render functions

- propTypes validation

- redux connect related functions


#### Summary

Redux Flow
- Action
- Stores
- Reducers
- Container Components

