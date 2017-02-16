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

export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export function signUpFail() {
  return {
    type: SIGN_UP_FAILED
  };
}