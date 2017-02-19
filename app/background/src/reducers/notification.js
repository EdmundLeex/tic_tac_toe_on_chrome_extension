import { Map } from 'immutable';
import * as actions from '../actions/index';

function showNotification(state, notification) {
  return state.set('type', notification.type)
              .set('text', notification.msg)
              .set('status', 'shown');
}

function hideNotification(state) {
  return state.set('type', '')
              .set('text', '')
              .set('status', 'hidden');
}

const initialState = Map({
  text: '',
  type: '',
  status: 'hidden'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_NOTIFICATION:
      return showNotification(state, action.payload);
    case actions.HIDE_NOTIFICATION:
      return hideNotification(state);
    default:
      return state;
  }
};
