export const PLACE_MARK = 'PLACE_MARK';
export function placeMark(move) {
  return {
    type: PLACE_MARK,
    payload: move
  }
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT
  }
}

export const LOGIN_FORM_CHANGED = 'LOGIN_FORM_CHANGED';
export function onLoginFormChange(name, value) {
  return {
    type: LOGIN_FORM_CHANGED,
    payload: { name: name, value: value }
  }
}

export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT';
export function onLoginFormSubmit() {
  return {
    type: LOGIN_FORM_SUBMIT
  }
}

export const SIGN_UP_FORM_CHANGED = 'SIGN_UP_FORM_CHANGED';
export function onSignUpFormChange(name, value) {
  return {
    type: SIGN_UP_FORM_CHANGED,
    payload: { name: name, value: value }
  }
}

export const SIGN_UP_FORM_SUBMIT = 'SIGN_UP_FORM_SUBMIT';
export function onSignUpFormSubmit() {
  return {
    type: SIGN_UP_FORM_SUBMIT
  }
}

export const CHANGE_VIEW = 'CHANGE_VIEW';
export function changeViewTo(view) {
  return {
    type: CHANGE_VIEW,
    payload: view
  }
}

export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export function createNewGame() {
  return {
    type: CREATE_NEW_GAME
  }
}

export const FETCH_GAMES = 'FETCH_GAMES';
export function fetchGames() {
  return {
    type: FETCH_GAMES
  }
}

export const OPEN_GAME = 'OPEN_GAME';
export function openGame(gameId) {
  return {
    type: OPEN_GAME,
    payload: gameId
  }
}

export const ENSURE_SESSION = 'ENSURE_SESSION';
export function ensureSession() {
  return {
    type: ENSURE_SESSION
  }
}

export const FB_LOGIN = 'FB_LOGIN';
export function fbLogin() {
  return {
    type: FB_LOGIN
  }
}

export const SURRENDER = 'SURRENDER';
export function surrender() {
  return {
    type: SURRENDER
  }
}

export const PROPOSE_DRAW = 'PROPOSE_DRAW';
export function proposeDraw() {
  return {
    type: PROPOSE_DRAW
  }
}
