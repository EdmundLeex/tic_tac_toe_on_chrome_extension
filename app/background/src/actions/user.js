import * as actions from './index';

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSucceed() {
  return dispatch => {
    dispatch(changeLoginState(true));
    return {
      type: LOGIN_SUCCESS
    }
  }
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export function signUpSucceed() {
  return {
    type: SIGN_UP_SUCCESS
  }
}

export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE';
export function invalidateSession() {
  return dispatch => {
    dispatch(actions.changeViewTo('login'));
    dispatch(changeLoginState(false));
  }
}

export function changeLoginState(state) {
  return {
    type: CHANGE_LOGIN_STATE,
    payload: state
  }
}