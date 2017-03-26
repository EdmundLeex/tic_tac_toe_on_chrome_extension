import * as actions from '../actions/index';
import { BASE_URL, defaultHeaders } from '../config/api';
import { checkStatus } from '../util/util';
import { fbLogin } from '../util/facebook_login';

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

function logout() {
  return new Promise(resolve => {
    chrome.cookies.remove({
      url: BASE_URL,
      name: 'ticTacToeUserToken'
    }, resolve);
  });
}

function getUserToken() {
  return new Promise((resolve) => {
    chrome.cookies.get({
      url: BASE_URL,
      name: 'ticTacToeUserToken',
    }, resolve);
  })
  .then(cookies => {
    if (cookies) {
      return Promise.resolve(cookies.value);
    } else {
      return Promise.reject(Error('Invalid session token'));
    }
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
    let move = action.payload;
    fetch(`${BASE_URL}/game/${move.gameId}/make_move`, {
      method: 'PUT',
      headers: defaultHeaders,
      credentials: 'include',
      body: JSON.stringify({pos: move.pos})
    })
    .then(checkStatus)
    .then(res => res.json())
    .then(body => {
      dispatch(actions.setCurrentGame(body.game));
    })
    .catch(err => {
      if (err.code === 403) {
        dispatch(actions.popNotification('error', err.message));
      }
      console.error(err);
    });
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
    .then(user => Promise.all([user, setSessionToken(user.token)]))
    .then(([user, _]) => {
      dispatch(actions.popNotification('success', 'Welcome back!'));
      dispatch(actions.loginSucceed(user));
      dispatch(actions.changeViewTo('gameIndex'));
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
      if (err.message.match(/Invalid session token/)) {
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
      if (err.message.match(/Invalid session token/)) {
        dispatch(actions.invalidateSession());
      } else {
        console.error(err.message);
      }
    });
  },
  ENSURE_SESSION: (action) => (dispatch, getState) => {
    getUserToken()
    .then(token => login({token: token}))
    .then(() => {
      dispatch(actions.changeLoginState(true))
    })
    .catch(err => {
      if (err.message === 'Invalid session token') {
        dispatch(actions.invalidateSession());
      } else {
        console.error(err);
      }
    });
  },
  LOGOUT: (action) => (dispatch, getState) => {
    logout()
    .then(() => {
      dispatch(actions.changeLoginState(false));
      dispatch(actions.invalidateSession());
    });
  },
  FB_LOGIN: (action) => (dispatch, getState) => {
    fbLogin()
    .then(user => Promise.all([user, setSessionToken(user.sessionToken)]))
    .then(([user, _]) => {
      dispatch(actions.popNotification('success', 'Welcome back!'));
      dispatch(actions.loginSucceed(user));
      dispatch(actions.changeViewTo('gameIndex'));
    })
    .catch(err => {
      console.error(err);
      dispatch(actions.popNotification('error', err.message));
    });;;
  }
};

export default aliases;
