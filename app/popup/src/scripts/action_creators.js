export const PLACE_MARK = 'PLACE_MARK';
export function placeMark(pos) {
  return {
    type: PLACE_MARK,
    payload: pos
  }
}

export const SIGN_IN_FORM_CHANGED = 'SIGN_IN_FORM_CHANGED';
export function onSignInFormChange(name, value) {
  return {
    type: SIGN_IN_FORM_CHANGED,
    payload: { name: name, value: value }
  }
}

export const SIGN_IN_FORM_SUBMIT = 'SIGN_IN_FORM_SUBMIT';
export function onSignInFormSubmit() {
  return {
    type: SIGN_IN_FORM_SUBMIT
  }
}

export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';
export function onErrorShown() {
  return {
    type: NOTIFICATION_ERROR
  };
}