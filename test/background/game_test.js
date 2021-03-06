import Game from '../../app/background/src/models/game';
import { getRandomPos, getAnotherRandomPos, makeMove } from '../test_helper';
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

  describe("when it's a game with one level board", () => {
    let game = null;

    beforeEach(() => {
      let players = [{ mark: 'x' }, { mark: 'o' }];
      game = Game.newGame({ level: 1, players: players });
    });

    describe('#makeMove()', () => {
      it('makes move and swap players', () => {
        assert.equal(game.currentPlayer.mark, 'x');
        assert.equal(game.nextPlayer.mark, 'o');
        game.makeMove([0]);
        assert.equal(game.currentPlayer.mark, 'o');
        assert.equal(game.nextPlayer.mark, 'x');

        assert.equal(game.board.grid[0], 'x');
      });

      it('thows error on invalid moves', () => {
        assert.equal(game.currentPlayer.mark, 'x');
        game.makeMove([0]);
        assert.equal(game.currentPlayer.mark, 'o');

        let invalidMove = game.makeMove.bind(game, [0]);
        assert.throws(invalidMove, 'Invalid move');
        // doesn't swap player
        assert.equal(game.currentPlayer.mark, 'o');
      });
    });
  });

  describe("when it's a game with two level board", () => {
    let game = null;

    beforeEach(() => {
      let players = [{ mark: 'x' }, { mark: 'o' }];
      game = Game.newGame({ level: 2, players: players });
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

      it('thows error on invalid moves (same pos)', () => {
        assert.equal(game.currentPlayer.mark, 'x');
        let randPos = [getRandomPos(), getRandomPos()];
        game.makeMove(randPos);
        assert.equal(game.currentPlayer.mark, 'o');

        let invalidMove = game.makeMove.bind(game, randPos);
        assert.throws(invalidMove, 'Invalid move');
        assert.equal(game.currentPlayer.mark, 'o');
      });

      it('thows error on invalid moves (against game rule)', () => {
        assert.equal(game.currentPlayer.mark, 'x');
        let randPos = [getRandomPos(), getRandomPos()];
        game.makeMove(randPos);
        assert.equal(game.currentPlayer.mark, 'o');

        let invalidPos = [getAnotherRandomPos(randPos[1]), getRandomPos()];
        let invalidMove = game.makeMove.bind(game, invalidPos);
        assert.throws(invalidMove, 'Invalid move');
        assert.equal(game.currentPlayer.mark, 'o');
      });
    });
  });

  describe('game flow', () => {
    describe("when it's a one level game", () => {
      let players = [{ mark: 'x' }, { mark: 'o' }];
      let game;

      beforeEach(() => {
        game = Game.newGame({ players: players, level: 1 });
      });

      it('plays a game that has winner', () => {
        game.makeMove([0]);
        assert.throws(game.makeMove.bind(game, [0]), 'Invalid move');
        assert.equal(game.isOver(), false);
        game.makeMove([1]);
        game.makeMove([4]);
        game.makeMove([2]);
        game.makeMove([8]);
        assert.equal(game.winner.mark, 'x');
        assert.equal(game.isOver(), true);
      });

      it('plays a game that ties', () => {
        game.makeMove([4]);
        game.makeMove([0]);
        game.makeMove([2]);
        game.makeMove([6]);
        game.makeMove([8]);
        game.makeMove([5]);
        game.makeMove([1]);
        game.makeMove([7]);
        game.makeMove([3]);
        assert.equal(game.isOver(), true);
        assert.equal(game.winner, null);
      });
    });

    describe("when it's a two level game", () => {
      let players = [{ mark: 'x' }, { mark: 'o' }];
      let game;

      beforeEach(() => {
        game = Game.newGame({ players: players, level: 2 });
      });

      it('plays a game that has winner', () => {
        game.makeMove([6, 8]);
        assert.throws(game.makeMove.bind(game, [6, 8]), 'Invalid move');
        assert.throws(game.makeMove.bind(game, [6, 0]), 'Invalid move');
        assert.equal(game.isOver(), false);
        game.makeMove([8, 6]);
        game.makeMove([6, 5]);
        game.makeMove([5, 6]);
        game.makeMove([6, 2]);
        game.makeMove([2, 3]);
        game.makeMove([3, 8]);
        game.makeMove([8, 3]);
        game.makeMove([3, 5]);
        game.makeMove([5, 3]);
        assert.equal(game.winner, null);
        game.makeMove([3, 2]);
        game.makeMove([2, 0]);
        game.makeMove([0, 8]);
        game.makeMove([8, 0]);
        game.makeMove([0, 5]);
        game.makeMove([5, 0]);
        game.makeMove([0, 2]);
        assert.equal(game.winner.mark, 'x');
        assert.equal(game.isOver(), true);
      });

      it('plays a game that ties', () => {
        game.makeMove([0, 0]);
        game.makeMove([0, 1]);
        game.makeMove([1, 0]);
        game.makeMove([0, 3]);
        game.makeMove([3, 0]);
        game.makeMove([0, 2]);
        game.makeMove([2, 1]);
        game.makeMove([1, 1]);
        game.makeMove([1, 2]);
        game.makeMove([2, 0]);
        game.makeMove([0, 4]);
        game.makeMove([4, 0]);
        game.makeMove([0, 5]);
        game.makeMove([5, 0]);
        game.makeMove([0, 6]);
        game.makeMove([6, 3]);
        game.makeMove([3, 1]);
        game.makeMove([1, 4]);
        game.makeMove([4, 4]);
        game.makeMove([4, 8]);
        game.makeMove([8, 0]);
        game.makeMove([0, 8]);
        game.makeMove([8, 5]);
        game.makeMove([5, 5]);
        game.makeMove([5, 8]);
        game.makeMove([8, 4]);
        game.makeMove([4, 5]);
        game.makeMove([5, 4]);
        game.makeMove([4, 2]);
        game.makeMove([2, 3]);
        game.makeMove([3, 2]);
        game.makeMove([2, 6]);
        game.makeMove([6, 0]);
        game.makeMove([0, 7]);
        game.makeMove([7, 0]);
        game.makeMove([1, 7]);
        game.makeMove([7, 1]);
        game.makeMove([1, 3]);
        game.makeMove([3, 8]);
        game.makeMove([8, 1]);
        game.makeMove([1, 8]);
        game.makeMove([8, 7]);
        game.makeMove([7, 2]);
        game.makeMove([2, 5]);
        game.makeMove([5, 3]);
        game.makeMove([3, 5]);
        game.makeMove([5, 7]);
        game.makeMove([7, 4]);
        game.makeMove([4, 6]);
        game.makeMove([6, 4]);
        game.makeMove([4, 3]);
        game.makeMove([3, 4]);
        game.makeMove([4, 1]);
        game.makeMove([1, 5]);
        game.makeMove([5, 2]);
        game.makeMove([2, 2]);
        game.makeMove([2, 4]);
        game.makeMove([4, 7]);
        game.makeMove([7, 5]);
        game.makeMove([5, 6]);
        game.makeMove([6, 5]);
        game.makeMove([5, 1]);
        game.makeMove([1, 6]);
        game.makeMove([6, 1]);
        game.makeMove([2, 7]);
        game.makeMove([7, 8]);
        game.makeMove([8, 3]);
        game.makeMove([3, 3]);
        game.makeMove([3, 6]);
        game.makeMove([6, 2]);
        game.makeMove([2, 8]);
        game.makeMove([8, 8]);
        game.makeMove([8, 6]);
        game.makeMove([6, 7]);
        game.makeMove([7, 6]);
        game.makeMove([6, 6]);
        game.makeMove([6, 8]);
        game.makeMove([8, 2]);
        game.makeMove([3, 7]);
        game.makeMove([7, 3]);
        game.makeMove([7, 7]);
        assert.equal(game.isOver(), true);
        assert.equal(game.winner, null);
      });
    });
  });
});