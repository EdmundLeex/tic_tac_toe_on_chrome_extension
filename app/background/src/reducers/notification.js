import { Map } from 'immutable';
import * as actions from '../actions/index';

function showNotification(state, type, text) {
  return state.set('type', type)
              .set('text', text)
              .set('status', 'shown');
}

function showSuccessMsg(state, msg) {
  return showNotification(state, 'success', msg);
}

function showInfoMsg(state, msg) {
  return showNotification(state, 'info', msg);
}

function showErrorMsg(state, errorMsg) {
  return showNotification(state, 'error', errorMsg);
}

const initialState = Map({
  text: '',
  type: '',
  status: 'hidden'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.NOTIFICATION_SUCCESS:
      return showSuccessMsg(state, action.payload);
    case actions.NOTIFICATION_INFO:
      return showInfoMsg(state, action.payload);
    case actions.NOTIFICATION_ERROR:
      return showErrorMsg(state, action.payload);
    default:
      return state;
  }
};
