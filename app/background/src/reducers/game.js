import Game from '../models/game';

function makeMove(state, movePos) {
  let game = state.game;
  game.makeMove([0, 0]);

  return state.game = game;
}

const initialState = {
  game: Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] })
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      return makeMove(state, action.payload);
    default:
      return state;
  }
};
