import { Map } from 'immutable';
import * as actions from '../actions/index';

function setUser(state, user) {
  return state.set('id', user.id)
              .set('email', user.email);
}

const initialState = Map({
  id: null,
  email: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return setUser(state, action.payload);
    case actions.CLEAR_USER:
      return setUser(state, {id: null, email: null});
    default:
      return state;
  }
};
