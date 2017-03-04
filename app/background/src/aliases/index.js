import * as actions from '../actions/index';
import { BASE_URL } from '../config/api';
import { checkStatus } from '../util/util';

const default_headers = {
  'Access-Control-Allow-Origin': BASE_URL,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': BASE_URL,
  'Host': BASE_URL
};

function login(credentials) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: default_headers,
    body: JSON.stringify(credentials)
  });
}

function signUp(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: default_headers,
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
}

function getUserToken() {
  return new Promise((resolve) => {
    chrome.cookies.get({
      url: BASE_URL,
      name: 'ticTacToeUserToken',
    }, resolve);
  });
}

function createGameForUser(userToken) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(`${BASE_URL}/games`, {
    method: 'POST',
    headers: default_headers,
    body: JSON.stringify({token: userToken})
  });
}

function setSessionToken(token) {
  return new Promise((resolve) => {
    chrome.cookies.set({
      url: BASE_URL,
      name: 'ticTacToeUserToken',
      value: token
    }, resolve);
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

      signUp(email, password)
        .then(checkStatus)
        .then((res) => res.json())
        .then((body) => setSessionToken(body.token))
        .then(() => {
          dispatch(actions.popNotification('success', 'Welcome to Super Tic Tac Toe!'));
          dispatch(actions.signUpSucceed());
        })
        .catch((err) => {
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

    login({email, password})
      .then(checkStatus)
      .then((res) => res.json())
      .then((body) => setSessionToken(body.token))
      .then(() => {
        dispatch(actions.popNotification('success', 'Welcome back!'));
        dispatch(actions.loginSucceed());
        dispatch(actions.changeViewTo('home'));
      })
      .catch((err) => {
        console.error(err);
        dispatch(actions.popNotification('error', err.message));
      });
  },
  CREATE_NEW_GAME: (action) => (dispatch, getState) => {
    getUserToken().then((cookies) => {
      if (cookies) {
        createGameForUser(cookies.value).then(checkStatus).then((res) => {
          res.json().then((body) => {
            dispatch(actions.newGame(body.id));
          })
        }).catch((err) => {

        })
      }
    });
  },
  FETCH_GAMES: (action) => (dispatch, getState) => {
    return fetch(`${BASE_URL}/games`, {
      credentials: 'include'
    }).then((res) => {
      return res.json();
    }).then((body) => {
      let games = JSON.parse(body.games);
      dispatch(actions.receiveGames(games));
    });
  },
  OPEN_GAME: (action) => (dispatch, getState) => {
    const gameId = action.payload;
    return fetch(`${BASE_URL}/games/${gameId}`, {
      credentials: 'include'
    }).then(checkStatus).then((res) => {
      return res.json();
    }).then((body) => {
      dispatch(actions.setCurrentGame(body.game));
      dispatch(actions.changeViewTo('game'));
    });
  }
};

export default aliases;
