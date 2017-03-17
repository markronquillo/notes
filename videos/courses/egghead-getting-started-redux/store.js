// implement our own store
//
var configureStore = (reducer) => {
    // we maintain a list of subscribed listenerse
    let listeners = [];

    const getState = () => state;
    
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            // we return a function that if it is called
            // removes the listener from our list of listeners
            listeners.filter(l => listener !== l);
        }
    }
    
    // we call an initial dispatch with no action
    // to initialize the state values
    dispatch({});

    return {
        getState,
        dispatch,
        subscribe
    }
}


