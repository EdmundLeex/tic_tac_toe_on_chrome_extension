import * as actions from '../actions/index';
import { BASE_URL } from '../config/api';

function checkStatus(resp) {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  const error = new Error(resp.statusText);
  error.resp = resp;
  throw error;
}

function login(credentials) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': BASE_URL,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': BASE_URL,
      'Host': BASE_URL
    },
    body: JSON.stringify(credentials)
  });
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
  SIGN_UP_FORM_SUBMIT: (action) => (dispatch, getState) => {
    const state = getState().signUpForm;
    const email = state.get('email');
    const password = state.get('password');
    const passwordConf = state.get('passwordConf');

    if (password !== passwordConf) {
      dispatch(actions.popNotification('error', "You password doesn\'t match."));
    } else {
      dispatch(actions.waitForResponse());
      dispatch(actions.clearPassword());

      signUp(email, password).then(checkStatus).then(function(res) {
        dispatch(actions.popNotification('success', 'Welcome to Super Tic Tac Toe!'));
        dispatch(actions.signUpSucceed());
      }).catch(function(err) {
        console.error(err);
        dispatch(actions.popNotification('error', err.message));
      });
    }
  },
  LOGIN_FORM_SUBMIT: (action) => (dispatch, getState) => {
    const state = getState().loginForm;
    const email = state.get('email');
    const password = state.get('password');

    dispatch(actions.waitForResponse());
    dispatch(actions.clearPassword());

    login({email, password}).then(checkStatus).then(function(res) {
      dispatch(actions.popNotification('success', 'Welcome back!'));
      dispatch(actions.loginSucceed());
      res.json().then((body) => {
        chrome.cookies.set({
          url: BASE_URL,
          name: 'tic_tac_toe_user_token',
          value: body.token
        });
      });
    }).catch(function(err) {
      console.error(err);
      dispatch(actions.popNotification('error', err.message));
    });
  },
  CHECK_USER_SESSION: (action) => (dispatch, getState) => {
    chrome.cookies.get({
      url: BASE_URL,
      name: 'tic_tac_toe_user_token'
    }, function(cookies) {
      if (cookies) {
        login({token: cookies.value}).then(checkStatus).then(function(res) {
          dispatch(actions.changeViewTo('game'));
        }).catch(function(err) {
          dispatch(actions.changeViewTo('login'));
        });
      }
    });
  }
};

export default aliases;

