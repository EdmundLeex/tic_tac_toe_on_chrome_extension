import { Map } from 'immutable';
import Game from '../models/game';
import * as actions from '../actions/index';

function makeMove(state, movePos) {
  let game = state.get('game');
  game.makeMove(movePos);

  state.set('game', game);
  return state;
}

const initialState = Map({
  game: Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] })
});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PLACE_MARK':
      return makeMove(state, action.payload);
    case actions.CREATE_NEW_GAME:
      return;
    default:
      return state;
  }
};
