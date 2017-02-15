export const PLACE_MARK = 'PLACE_MARK';
export function placeMark(pos) {
  return {
    type: PLACE_MARK,
    payload: pos
  }
}

export function makeMove(pos) {
  return {
    type: 'POST_MARK_TO_SERVER'
  }
  // return dispatch => {
  //   dispatch({type: 'POST_MARK_TO_SERVER', payload: 'foooo'});
  //   // dispatch(placeMark(pos));
  // }
}

export const SIGN_IN_FORM_CHANGE = 'SIGN_IN_FORM_CHANGE';
export function onSignInFormChange(name, value) {
  return {
    type: SIGN_IN_FORM_CHANGE,
    payload: { name: name, value: value }
  }
}

export const SIGN_IN_FORM_SUBMIT = 'SIGN_IN_FORM_SUBMIT';
export function onSignInFormSubmit() {
  return {
    type: SIGN_IN_FORM_SUBMIT
  }
}