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

export function notifyError(err) {
  return dispatch => {
    dispatch(showNotification('error', err));
    window.setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };
}

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
function showNotification(type, msg) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      type: type,
      msg: msg
    }
  };
}

export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
function hideNotification() {
  return {
    type: HIDE_NOTIFICATION
  };
}