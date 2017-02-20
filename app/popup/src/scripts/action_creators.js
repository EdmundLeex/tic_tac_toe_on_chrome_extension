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

export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';
export function onSignUpFormChange(name, value) {
  return {
    type: SIGN_UP_FORM_CHANGED,
    payload: { name: name, value: value }
  }
}

export const SIGN_UP_FORM_SUBMIT = 'SIGN_UP_FORM_SUBMIT';
export function onSignUpFormSubmit() {
  return {
    type: SIGN_UP_FORM_SUBMIT
  }
}

export const CHANGE_VIEW = 'CHANGE_VIEW';
export function changeViewTo(view) {
  return {
    type: CHANGE_VIEW,
    payload: view
  }
}