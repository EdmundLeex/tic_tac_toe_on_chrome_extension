import { Map } from 'immutable';
import * as actions from '../actions/index';

function changeActiveView(state, view) {
  return state.set('currentView', view);
}

const initialState = Map({
  currentView: 'home'
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.API_ERROR:
      return setErrorMsg(state, action.payload);
    case actions.CHANGE_VIEW:
      return changeActiveView(state, action.payload);
    default:
      return state;
  }
};
