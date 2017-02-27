export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';

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

export const SET_CURRENT_GAME = 'SET_CURRENT_GAME';
export function setCurrentGame(gameId) {
  return {
    type: SET_CURRENT_GAME,
    payload: gameId
  }
}