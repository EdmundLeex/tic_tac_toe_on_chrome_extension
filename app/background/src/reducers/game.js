import { Map } from 'immutable';
import Game from '../models/game';

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
    case 'MAKE_MOVE':
      return makeMove(state, action.payload);
    default:
      return state;
  }
};
