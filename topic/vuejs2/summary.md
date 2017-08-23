## Application Structure
Normally your Vue/Vuex application structure will look like this

```
app/
|-- components/
|-- store/
    |---- modules/
    |---- index.js
index.js
```

## Workflow

Using Vuex, we now manage our store in one area. Whenever we want to update the store we either `commit mutations` or `dispatch actions` in our components. 


## Initialization

```javascript
// initialize Vue object and use Vuex
import Vuex from 'vuex'
import store from './store/'

Vue.use(Vuex)
new Vue({
    el: 'body',
    store 
})

new Vuex.Store({
    modules: {
        ...
    }
})
```

## State

To define states, create an object that contains values for the state, that easy.

To use the state values in your components

```javascript
computed: {
    ...mapState([
        // defining by strings    
        'name',
        'email'
    ]),

    ...mapState({
        // by objects, if we want to rename it
        awesomeName: state => state.name,

        awesomeName: 'name',

        awesomeName: state => `awesome ${state.name}`
    })
}

// with namespace modules
computed: {
    ...mapState('your/namespace/here', [
        'name',
        'email'
    ])
}
```

## Getters


## Mutations

Mutations method accepts the state as parameter. If namespaces or modules, it receives the state for that module only, and to access the rootState, refer to the `rootState`.

```javascript

mutations: {
    updateData(state, payload) {
        state.value = payload
    }
}

```

## Actions

Action methods accepts a context that contains, `commit` method, etc.

```javascript
{
    loadData({ commit }) {
        // async load data 
        commit({
            type: 'updateData',
            payload: response.data
        })
    }
}
```











