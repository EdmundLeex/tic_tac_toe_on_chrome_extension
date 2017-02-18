import { Map } from 'immutable';
import * as actions from '../actions/index';

function setErrorMsg(state, error) {
  return state.set('errorMsg', error);
}

const initialState = Map({
  errorMsg: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.API_ERROR:
      return setErrorMsg(state, action.payload);
    default:
      return state;
  }
};
