import Game from '../../app/background/src/models/game';
import assert from 'assert';

describe('Game', () => {
  describe('::newGame()', () => {
    it('creates game with two level as default', () => {
      let game = Game.newGame();
      assert(game.level, 2);
      assert.equal(game.board.level, 2);
    });

    it ('creates game with given level', () => {
      let game = Game.newGame({ level: 1 });
      assert.equal(game.level, 1);
      assert.equal(game.board.level, 1);
    });
  });

  describe('#makeMove()', () => {
    it('makes move and swap players', () => {
      let players = [{ mark: 'x' }, { mark: 'o' }];
      let game = Game.newGame({ players: players });

      assert.equal(game.currentPlayer.mark, 'x');
      assert.equal(game.nextPlayer.mark, 'o');
      game.makeMove([0, 0]);
      assert.equal(game.currentPlayer.mark, 'o');
      assert.equal(game.nextPlayer.mark, 'x');

      assert.equal(game.board.grid[0].grid[0], 'x');
    });
  });
});