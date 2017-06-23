import initialState from './initialState';

const reducers = {
  ADD_TODO(state, action) {
    return [
      ...state,
      action.payload
    ];
  },

  EDIT_TODO(state, action) {
    return [
      ...state.filter(todo => todo.id !== action.payload.id),
      action.payload
    ];
  },

  DELETE_TODO(state, action) {
    return state.filter(todo => todo.id !== action.payload.id);
  }
};

export default (state = initialState.todos, action) => {
  return action.type in reducers
    ? reducers[action.type](state, action)
    : state
    ;
}