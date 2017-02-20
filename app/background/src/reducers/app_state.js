import { Map } from 'immutable';
import * as actions from '../actions/index';

function redirectToGameAndSetLoggedIn(state) {
  return state.set('currentView', 'game')
              .set('loggedIn', true);
}

const initialState = Map({
  currentView: 'login',
  loggedIn: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.API_ERROR:
      return setErrorMsg(state, action.payload);
    case actions.LOGIN_SUCCESS:
      return redirectToGameAndSetLoggedIn(state);
    default:
      return state;
  }
};
