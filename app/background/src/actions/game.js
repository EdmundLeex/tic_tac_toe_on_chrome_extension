import BASE_URL from '../../../base_url';
import { checkStatus } from '../util/util';
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
  return (dispatch, getState) => {
    const loggedIn = getState().appState.get('loggedIn')

    if (loggedIn) {
      fetch(`${BASE_URL}/games`, {
        credentials: 'include'
      }).then(checkStatus).then((res) => {
        return res.json();
      }).then((body) => {
        let games = JSON.parse(body.games);
        dispatch(receiveGames(games));

        let myTurnCount = 0;
        for (let gameId in games) {
          let game = games[gameId];
          let userId = getState().user.get('id');
          if (game.status === 'STARTED' && game.lastMoveUserId !== userId) {
            myTurnCount++;
          }
        }
        if (myTurnCount === 0) myTurnCount = '';
        chrome.browserAction.setBadgeText({text: String(myTurnCount)});
      }).catch((err) => {
        if (err.message == 'Invalid session token') {
          dispatch(actions.changeViewTo('login'));
        } else {
          throw err;
        }
      });
    }
  }
}
