import Game from '../../app/background/src/models/game';
import assert from 'assert';

describe('Game', () => {
  describe('::newGame()', () => {
    it('creates game with two level as default', () => {
      let game = Game.newGame();
      assert.equal(game.level, 2);
      assert.equal(game.board.level, 2);
    });

    it ('creates game with given level', () => {
      let game = Game.newGame({ level: 1 });
      assert.equal(game.level, 1);
      assert.equal(game.board.level, 1);
    })
  });
});