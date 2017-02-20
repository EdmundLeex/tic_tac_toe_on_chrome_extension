export * from './notification';

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';
export const CHECK_USER_SESSION = 'CHECK_USER_SESSION';

export const WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE';
export function waitForResponse() {
  return {
    type: WAITING_FOR_RESPONSE
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSucceed() {
  return {
    type: LOGIN_SUCCESS
  };
}

export const CLEAR_PASSWORD = 'CLEAR_PASSWORD';
export function clearPassword() {
  return {
    type: CLEAR_PASSWORD
  };
}

export const CHANGE_VIEW = 'CHANGE_VIEW';
export function changeViewTo(view) {
  return {
    type: CHANGE_VIEW,
    payload: view
  }
}