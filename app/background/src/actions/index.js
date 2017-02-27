export * from './notification';

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';

export const WAITING_FOR_RESPONSE = 'WAITING_FOR_RESPONSE';
export function waitForResponse() {
  return {
    type: WAITING_FOR_RESPONSE
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSucceed() {
  return {
    type: LOGIN_SUCCESS
  };
}

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export function signUpSucceed() {
  return {
    type: SIGN_UP_SUCCESS
  }
}

export const CLEAR_PASSWORD = 'CLEAR_PASSWORD';
export function clearPassword() {
  return {
    type: CLEAR_PASSWORD
  };
}

export const CHANGE_VIEW = 'CHANGE_VIEW';
export function changeViewTo(view) {
  return {
    type: CHANGE_VIEW,
    payload: view
  }
}

export const NEW_GAME = 'NEW_GAME';
export function newGame(id) {
  return {
    type: NEW_GAME,
    payload: id
  }
}

export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export function receiveGames(games) {
  return {
    type: RECEIVE_GAMES,
    payload: games
  }
}