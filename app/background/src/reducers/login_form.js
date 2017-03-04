import { Map } from 'immutable';
import * as actions from '../actions/index';

function setFormValue(state, formValues) {
  return state.set(formValues.name, formValues.value);
}

function setWaitForResponse(state, bool) {
  return state.set('waitingForResponse', bool);
}

function onLoginSuccess(state) {
  return state.set('waitingForResponse', false)
              .set('email', '');
}

function clearField(state, fieldName) {
  return state.set(fieldName, '');
}

const initialState = Map({
  email: '',
  password: '',
  waitingForResponse: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_FORM_CHANGED:
      return setFormValue(state, action.payload);
    case actions.WAITING_FOR_RESPONSE:
      return setWaitForResponse(state, true);
    case actions.LOGIN_SUCCESS:
      return onLoginSuccess(state);
    case actions.CLEAR_PASSWORD:
      return clearField(state, 'password');
    default:
      return state;
  }
};
