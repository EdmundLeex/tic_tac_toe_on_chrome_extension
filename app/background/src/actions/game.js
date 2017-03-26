import { checkStatus, BASE_URL } from '../util/util';
import * as actions from './index';

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
export function setCurrentGame(game) {
  return {
    type: SET_CURRENT_GAME,
    payload: game
  }
}

export function fetchGames() {
  return dispatch => {
    fetch(`${BASE_URL}/games`, {
      credentials: 'include'
    }).then(checkStatus).then((res) => {
      return res.json();
    }).then((body) => {
      let games = JSON.parse(body.games);
      dispatch(receiveGames(games));
    }).catch((err) => {
      if (err.message == 'Invalid session token') {
        dispatch(actions.changeViewTo('login'));
      } else {
        throw err;
      }
    });
  }
}