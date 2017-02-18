import { Map } from 'immutable';
import * as actions from '../actions/index';

const BASE_URL = 'http://localhost:3000/';

function onSignInFormChanged(state, formValues) {
  return state.set(formValues.name, formValues.value);
}

function onRequestSent(state) {
  return state.set('waitingForResponse', true)
              .set('password', '');
}

function onSignUpSuccess(state) {
  return state.set('waitingForResponse', false)
              .set('email', '');
}

const initialState = Map({
  email: '',
  password: '',
  waitingForResponse: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_FORM_CHANGED:
      return onSignInFormChanged(state, action.payload);
    case actions.WAITING_FOR_RESPONSE:
      return onRequestSent(state);
    case actions.SIGN_UP_SUCCESS:
      return onSignUpSuccess(state);
    default:
      return state;
  }
};
