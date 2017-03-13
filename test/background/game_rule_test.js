import Board from '../../app/background/src/models/board';
import GameRule from '../../app/background/src/models/game_rule';
import { getRandomPos, getAnotherRandomPos } from '../test_helper';
import assert from 'assert';

describe('GameRule', () => {
  let gameRule = null;
  let board = null;

  beforeEach(() => {
    board = Board.newBoard({ level: 2 });
    gameRule = new GameRule();
    gameRule.board = board;
  });

  describe('#isValidMove()', () => {
    it('returns true for valid moves', () => {
      assert.equal(gameRule.isValidMove([8, 0]), true);
      assert.equal(gameRule.isValidMove([0, 1]), true);
    });

    it('returns false for invalid moves (occupied pos)', () => {
      gameRule.registerMove([0, 0]);
      board.placeMark([0, 0], 'x');

      assert.equal(gameRule.isValidMove([0, 0]), false);
    });

    it('returns false for invalid moves (unallowed pos)', () => {
      let randPos = [getRandomPos(), getRandomPos()];
      gameRule.registerMove(randPos);
      board.placeMark(randPos, 'x');

      let invalidRandPos = [getAnotherRandomPos(randPos[1]), getRandomPos()];
      assert.equal(gameRule.isValidMove(invalidRandPos), false);
    });

    it('returns true if previousPos points to a full grid', () => {
      makeMove(gameRule, board, [0, 0], 'x');
      makeMove(gameRule, board, [0, 1], 'o');
      makeMove(gameRule, board, [1, 0], 'x');
      makeMove(gameRule, board, [0, 3], 'o');
      makeMove(gameRule, board, [3, 0], 'x');
      makeMove(gameRule, board, [0, 2], 'o');
      makeMove(gameRule, board, [2, 1], 'x');
      makeMove(gameRule, board, [1, 1], 'o');
      makeMove(gameRule, board, [1, 2], 'x');
      makeMove(gameRule, board, [2, 0], 'o');
      makeMove(gameRule, board, [0, 4], 'x');
      makeMove(gameRule, board, [4, 0], 'o');
      makeMove(gameRule, board, [0, 5], 'x');
      makeMove(gameRule, board, [5, 0], 'o');
      makeMove(gameRule, board, [0, 6], 'x');
      makeMove(gameRule, board, [6, 3], 'o');
      makeMove(gameRule, board, [3, 1], 'x');
      makeMove(gameRule, board, [1, 4], 'o');
      makeMove(gameRule, board, [4, 4], 'x');
      makeMove(gameRule, board, [4, 8], 'o');
      makeMove(gameRule, board, [8, 0], 'x');
      makeMove(gameRule, board, [0, 8], 'o');
      makeMove(gameRule, board, [8, 5], 'x');
      makeMove(gameRule, board, [5, 5], 'o');
      makeMove(gameRule, board, [5, 8], 'x');
      makeMove(gameRule, board, [8, 4], 'o');
      makeMove(gameRule, board, [4, 5], 'x');
      makeMove(gameRule, board, [5, 4], 'o');
      makeMove(gameRule, board, [4, 2], 'x');
      makeMove(gameRule, board, [2, 3], 'o');
      makeMove(gameRule, board, [3, 2], 'x');
      makeMove(gameRule, board, [2, 6], 'o');
      makeMove(gameRule, board, [6, 0], 'x');
      makeMove(gameRule, board, [0, 7], 'o');
      assert.equal(board.grid[0].isFull(), true);
      makeMove(gameRule, board, [7, 0], 'x');
      assert.equal(gameRule.isValidMove([1, 7]), true);
      assert.equal(gameRule.isValidMove([8, 8]), true);
    });
  });

  describe('#registerMove()', () => {
    it('registers valid moves', () => {
      let registerFirstMove = gameRule.registerMove.bind(gameRule, [8, 0]);
      let registerSecondMove = gameRule.registerMove.bind(gameRule, [0, 1]);

      assert.doesNotThrow(registerFirstMove);
      assert.deepEqual(gameRule.previousPos, [8, 0]);
      assert.doesNotThrow(registerSecondMove);
      assert.deepEqual(gameRule.previousPos, [0, 1]);
    });

    it('throws error on invalid move (occupied pos)', () => {
      gameRule.registerMove([0, 0]);
      board.placeMark([0, 0], 'x');

      let registerInvalidMove = gameRule.registerMove.bind(gameRule, [0, 0]);
      assert.throws(registerInvalidMove, 'Move is against rule');
    });

    it('throws error on invalid move (unallowed pos)', () => {
      let randPos = [getRandomPos(), getRandomPos()];
      gameRule.registerMove(randPos);
      let invalidRandPos = [getAnotherRandomPos(randPos[1]), getRandomPos()];
      let registerInvalidMove = gameRule.registerMove.bind(gameRule, invalidRandPos);

      assert.throws(registerInvalidMove, 'Move is against rule');
    });
  });

  describe('#setAllowedGrid', () => {
    it('sets allowedGrid to null when no move has been made yet', () => {
      gameRule.setAllowedGrid();
      assert.equal(gameRule.allowedGrid, null);
    });

    it('sets allowedGrid according to previous move', () => {
      assert.equal(gameRule.allowedGrid, null);
      gameRule.previousPos = [1, 2];
      gameRule.setAllowedGrid();
      assert.equal(gameRule.allowedGrid, 2);
    });

    it('sets allowedGrid to null if the supposed allowedGrid is full', () => {
      makeMove(gameRule, board, [0, 0], 'x');
    })
  });

  function makeMove(gameRUle, board, pos, mark) {
    for (let i = 0; i < board.grid[0].grid.length; i++) {
      board.grid[0].grid = 'x';
    }
    gameRule.previousPos = [0, 0];
    gameRule.setAllowedGrid();
    assert.equal(gameRule.allowedGrid, null);
  }
});