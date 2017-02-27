import { Map, List } from 'immutable';
import Game from '../models/game';
import * as actions from '../actions/index';

function setGames(state, games) {
  let gamesMap = Map();
  games.forEach((game) => {
    gamesMap = gamesMap.set(game.id, game);
  });

  return state.set('games', gamesMap);
}

function setCurrentGame(state, gameId) {
  let game = state.getIn(['games', parseInt(gameId)]);
  return state.set('currentGame', game);
}

function makeMove(state, movePos) {
  let game = state.get('currentGame');
  game.makeMove(movePos);

  state.set('currentGame', game);
  return state;
}

function createNewGame(state, id) {
  let games = state.get('games');
  let game = Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] });
  game.id = id;
  games = games.push(game);

  return state.set('games', games);
}

const initialState = Map({
  games: List(),
  currentGame: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_MARK':
      return makeMove(state, action.payload);
    case actions.NEW_GAME:
      return createNewGame(state, action.payload);
    case actions.RECEIVE_GAMES:
      return setGames(state, action.payload);
    case actions.SET_CURRENT_GAME:
      return setCurrentGame(state, action.payload);
    default:
      return state;
  }
};
