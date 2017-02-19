export function popNotification(type, msg) {
  return dispatch => {
    dispatch(showNotification(type, msg));
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