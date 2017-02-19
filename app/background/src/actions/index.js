export const SIGN_IN_FORM_CHANGED = 'SIGN_IN_FORM_CHANGED';

export const WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE';
export function waitForResponse() {
  return {
    type: WAITING_FOR_RESPONSE
  };
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export function signUpSucceed() {
  return {
    type: SIGN_UP_SUCCESS
  };
}

export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export function showError(err) {
  return {
    type: NOTIFICATION_ERROR,
    payload: err
  };
}