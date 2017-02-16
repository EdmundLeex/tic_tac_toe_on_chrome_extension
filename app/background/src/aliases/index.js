import * as actions from '../actions/index';

const BASE_URL = 'http://localhost:3000';

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

const aliases = {
  PLACE_MARK: (action) => {
    console.log('api call...');
    return action;
  },
  SIGN_IN_FORM_SUBMIT: (action, store) => {
    const state = store.getState().signInForm;
    const email = state.get('email');
    const password = state.get('password');

    signUp(email, password).then(function(res) {
      if (res.status === 403) {
        return actions.signUpFail();
      } else if (res.status === 200) {
        return actions.signUpSucceed();
      } else {
        // log error
      }

    });

    return actions.waitForResponse();
  }
};

export default aliases;

