import Game from '../models/game';

function makeMove(state, movePos) {
  let game = state.game;
  game.makeMove([0, 0]);

  return state.game = game;
}

// const initialState = {
//   game: Game.newGame({ players: [{ mark: 'o'}, { mark: 'x' }] })
// };

function makeMove(state) {
  let newState = { count: state.count + 1 }
  return newState;
}

const initialState = {count: 0};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MAKE_MOVE':
      // return makeMove(state, action.payload);
      return makeMove(state);
    default:
      return state;
  }
};
