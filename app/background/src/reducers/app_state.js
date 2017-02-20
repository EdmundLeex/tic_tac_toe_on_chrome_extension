import { Map } from 'immutable';
import * as actions from '../actions/index';

const initialState = Map({
  currentView: 'login',
  loggedIn: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.API_ERROR:
      return setErrorMsg(state, action.payload);
    default:
      return state;
  }
};
