export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSucceed() {
  return {
    type: LOGIN_SUCCESS
  };
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export function signUpSucceed() {
  return {
    type: SIGN_UP_SUCCESS
  }
}