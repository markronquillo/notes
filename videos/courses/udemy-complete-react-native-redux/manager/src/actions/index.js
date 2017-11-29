import * as types from './types'
import firebase from 'firebase'

export const emailChanged = text => {
  return {
    type: types.EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = text => {
  return {
    type: types.PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: types.LOGIN_USER })
    
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => { loginUserSuccess(dispatch, user) })
      .catch(() => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => { loginUserSuccess(dispatch, user) })
      })
      .catch(() => { loginUserFail(dispatch) } )
  }
}

//// 

const loginUserFail = dispatch => {
  dispatch({ type: types.LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  console.log(user)
  dispatch({ type: types.LOGIN_USER_SUCCESS, payload: user })
}

