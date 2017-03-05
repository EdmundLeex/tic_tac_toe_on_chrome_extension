import * as actions from '../actions/index';
import { BASE_URL } from '../config/api';
import { checkStatus } from '../util/util';

const defaultHeaders = {
  'Access-Control-Allow-Origin': BASE_URL,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Origin': BASE_URL,
  'Host': BASE_URL
};

function login(credentials) {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(credentials)
  })
  .then(checkStatus)
  .then(res => res.json());
}

function signUp(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(checkStatus)
  .then(res => res.json())
  .then(body => setSessionToken(body.token));
}

function getUserToken() {
  return new Promise((resolve) => {
    chrome.cookies.get({
      url: BASE_URL,
      name: 'ticTacToeUserToken',
    }, resolve);
  });
}

function createGameForUser() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');

  return fetch(`${BASE_URL}/games`, {
    method: 'POST',
    headers: defaultHeaders,
    credentials: 'include'
  })
  .then(checkStatus)
  .then(res => res.json());
}

function fetchGamesForUser() {
  return fetch(`${BASE_URL}/games`, {
    credentials: 'include'
  })
  .then(checkStatus)
  .then(res => res.json());
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

const aliases = {
  PLACE_MARK: (action) => (dispatch) => {
    fetch(`${BASE_URL}/games`, {
      method: 'POST',
      headers: defaultHeaders,
      credentials: 'include'
    })
    .then(checkStatus)
    .then(res => res.json())

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
    .then(res => setSessionToken(res.token))
    .then(() => {
      dispatch(actions.popNotification('success', 'Welcome back!'));
      dispatch(actions.loginSucceed());
      dispatch(actions.changeViewTo('home'));
    })
    .catch(err => {
      console.error(err);
      dispatch(actions.popNotification('error', err.message));
    });
  },
  CREATE_NEW_GAME: (action) => (dispatch, getState) => {
    return createGameForUser()
    .then(res => {
      dispatch(actions.newGame(res.id));
    })
    .catch(err => {
      console.error(err);
      dispatch(actions.popNotification('error', err.message));
    });
  },
  FETCH_GAMES: (action) => (dispatch, getState) => {
    return fetchGamesForUser()
    .then(res => {
      let games = JSON.parse(res.games);
      dispatch(actions.receiveGames(games));
    })
    .catch(err => {
      if (err.code === 404 && err.message === 'Invalid session token') {
        dispatch(actions.invalidateSession());
      } else {
        console.error(err.message);
      }
    });
  },
  OPEN_GAME: (action) => (dispatch, getState) => {
    const gameId = action.payload;
    return fetch(`${BASE_URL}/games/${gameId}`, {
      credentials: 'include'
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(body => {
      dispatch(actions.setCurrentGame(body.game));
      dispatch(actions.changeViewTo('game'));
    })
    .catch(err => {
      if (err.code === 404 && err.message === 'Invalid session token') {
        dispatch(actions.invalidateSession());
      } else {
        console.error(err.message);
      }
    });
  },
  ENSURE_SESSION: (action) => (dispatch, getState) => {
    getUserToken()
    .then(token => login({token: token.value}))
    .then(() => {
      dispatch(actions.changeLoginState(true))
    })
    .catch(err => {
      if (err.code === 404 && err.message === 'Invalid session token') {
        dispatch(actions.invalidateSession());
      } else {
        console.error(err);
      }
    });
  }
};

export default aliases;
