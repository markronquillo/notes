Full Stack Redux Tutorial
-------------------------
http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html

A simple, predictable state model. An emphasis on functional programming and immutable data.


## Prerequisites

- Node
- ES6
- React
- Webpack
- Babel

## The App

The app will have two separate user interface. The voting UI can be used on a mobile device or anything else that has a web browser. The results UI is designed to be beamed on a projector or some other large screen. It'll show the results of the running vote in real time.

## The Architecture

There's a browser app we'll make for Node that handles the voting logic. Communication between the two will ber done using WebSockets.


## Designing the Application State Tree

Designing a Redux app often begins by thinking about the `applciation state` data structre. This is what describes what's going on in your application at any given time.

Redux - single state store (tree structure)

```
entries = {
    transpotting: 0,
    sunshine: 0,
    28dayslater: 0,
    127hours: 0,
    millions: 0,
    slumdog: 0,
}
```

Once the first vote has begun, there should be some way to distinguish what is currently being voted on.

```
vote = {
    pair: [
        [ transpotting, sunshine ]    
    ],
    tally: {
        trainspotting: 4,
        sunshine: 3
    }
}
```


Once a vote is done, the losing entry is thrown away and the winnign entry is back in entries as the last item, it will be later be voted against something else.

## Project Setup

`npm init -y`
`npm install --save-dev babel-core babel-cli babel-preset-es2015`
`npm install --save-dev mocha chai`

Setup testing environment

## Immutable

In Redux, the state is immutable

* Did some immutable testing *

## Writing the Application Logic with Pure Functions

### Loading Entries

### Introducing Actions and Reducers

An action is a simple data structure that describeds a change that should occur in your app state, its basically a description of a function call packaged into a little object.

### Taste of Reducer Composition

One reducer per subtree.


### Introducting the Redux Store

### Setting up a Socket.io Server

### Broadcasting State from A Redux Listener

What we'll do is subscribe a listener to the store that reads the current state, turns it into a plain JavaScript object, and emits it as a state event on the Socket.io server. The result will be that a JSON-serialized snapshot of the state is sent over all active Socket.io connections.

The solution we'll use for this is actually quite simple. What we can do is simply have our clients emit _action_ events that we feed directly into our Redux store.

### Server Application:

- A client sends an action to the server.
- The server hands the action to the Redux Store
- The Store calls the reducer adn the reducer executes the logic related to the action
- The Store updates its state based on the return value of the reducer.
- The Store executes the listener function subscribed by the server.
- The server emits a 'state' event
- All connected clients - including the one that initiated the original action - receive the new state.

