export const PLACE_MARK = 'PLACE_MARK';
export function placeMark(pos) {
  return {
    type: PLACE_MARK,
    payload: pos
  }
}

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export function onLoginFormChange(name, value) {
  return {
    type: LOGIN_FORM_CHANGED,
    payload: { name: name, value: value }
  }
}

export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
export function onLoginFormSubmit() {
  return {
    type: LOGIN_FORM_SUBMIT
  }
}

export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export function onErrorShown() {
  return {
    type: NOTIFICATION_ERROR
  };
}