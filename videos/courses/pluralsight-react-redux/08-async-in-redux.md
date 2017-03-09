Async in Redux
--------------


Why a mock API
Async libraries
Implement Thunks

#### Async libraries

- redux-thunk

- redux-promise

- redux-saga



#### Thunks overview


Thunk is a function that returns a function. CS term. A thunk is a function that wraps an expression in order to delay its evaluation.

```
export function deleteAuthor(authorId) {
	return dispatch => {
		return AuthorApi.deleteAuthor(authorId).then(() => {
			dispatch(deletedAuthor(authorId))
		}).catch(handleError);
	}
}
```


A thunk always returns a function that accepts dispatch.

```
export loadCourses() {
	return function(dispath) {
		
	}
}
```