Introduction to Redux
----------------------


Do I need Redux?
3 Principles
Flux vs Redux
Redux Flow


When do I need Redux?

- Complex data flows
- Inter-component communication
- Non-hierarchical data
- Many actions
- Same data used in multiple places


#### 3 core principles of Redux

One immutable store

Actions trigger changes

Reducers update state


#### Flux vs Redux Similarities

Data down. Actions up.

Both Unidirectional flows, both have actions and stores.

#### Flux vs Redux Difference

Reducers:

Containers: Components that pass the data down

Immutability: Redux store is immutable

Flux:
Stores contain state and change logic
Multiple stores
Flat and disconnected stores
Singleton dispatcher
React components subscribe to stores
State is mutated


Redux:
Store and change logic are separate
One store
Single store with hierarchical reducers
No dispatcher
Container components utilize connect (React-Redux library)
State is immutable


#### Redux Flow

Reducer: function that returns new state


#### Summary

3 Principles
- Immtable Store
- Actions trigger changes
- Reducer return updated state





