import { Map, List } from 'immutable';
import Game from '../models/game';
import * as actions from '../actions/index';

function makeMove(state, movePos) {
  let game = state.get('game');
  game.makeMove(movePos);

  state.set('game', game);
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
  game: Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] })
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_MARK':
      return makeMove(state, action.payload);
    case actions.NEW_GAME:
      return createNewGame(state, action.payload);
    default:
      return state;
  }
};
