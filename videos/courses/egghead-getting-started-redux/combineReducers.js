// combineReducers returns an reducer function
var combineReducers = (reducers) => {
    return (state = {}, action) => {
       return Object.keys(reducers).reduce(
        (nextState, key) => {
            nextState[key] = reducers[key](
                state[key],
                action
            );
            return nextState;
        }
    };
};



