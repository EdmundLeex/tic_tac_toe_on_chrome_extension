import { Map } from 'immutable';
import Game from '../models/game';

function makeMove(state, movePos) {
  let game = state.get('game');
  game.makeMove([0, 0]);

  state.set('game', game);
  return state;
}

const initialState = Map({
  game: Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] })
});

// function makeMove(state, incr) {
//   return state.set('count', state.get('count') + incr);
// }

// const initialState = Map({count: 0});

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      // return makeMove(state, action.payload);
      return makeMove(state, [0, 0]);
    default:
      return state;
  }
};
