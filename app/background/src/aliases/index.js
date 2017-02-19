import * as actions from '../actions/index';

const BASE_URL = 'http://localhost:3000';

function checkStatus(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  const error = new Error(resp.statusText);
  error.resp = resp;
  throw error;
}

function signUp(email, password) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': BASE_URL,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': BASE_URL,
      'Host': BASE_URL
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
}

function postMove(action) {
  console.log('api call...');
  return action;
}

const aliases = {
  PLACE_MARK: (action) => (dispatch) => {
    dispatch(postMove(action));
  },
  SIGN_IN_FORM_SUBMIT: (action) => (dispatch, getState) => {
    dispatch(actions.waitForResponse());

    const state = getState().signInForm;
    const email = state.get('email');
    const password = state.get('password');

    signUp(email, password).then(checkStatus).then(function(res) {
      dispatch(actions.signUpSucceed());
    }).catch(function(err) {
      console.error(err);
      dispatch(actions.showError(err.message));
    });
  }
};

export default aliases;

