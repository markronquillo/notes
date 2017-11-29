import * as types from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  user: null,
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  console.log(action)
  switch(action.type) {
    case types.EMAIL_CHANGED:
      return Object.assign({}, state, { email: action.payload })
    case types.PASSWORD_CHANGED:
      return Object.assign({}, state, { password: action.payload })
    case types.LOGIN_USER:
      return {...state, loading: true, error: ''} 
    case types.LOGIN_USER_SUCCESS:
      return { ...state, 
        ...INITIAL_STATE,
        user: action.payload, 
      }
    case types.LOGIN_USER_FAIL:
      return { ...state, error : 'Authentication Failed.', password: '', loading: false }
    default:
      return state
  }
}

