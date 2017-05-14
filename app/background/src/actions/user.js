import * as actions from './index';

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSucceed(user) {
  return dispatch => {
    dispatch(changeLoginState(true));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
  }
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export function signUpSucceed(user) {
  return dispatch => {
    dispatch(changeLoginState(true));
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: user
    });
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
