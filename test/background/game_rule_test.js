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
  });

  describe('#registerMove()', () => {
    it('registers valid moves', () => {
      let registerFirstMove = gameRule.registerMove.bind(gameRule, [8, 0]);
      let registerSecondMove = gameRule.registerMove.bind(gameRule, [0, 1]);

      assert.doesNotThrow(registerFirstMove);
      assert.doesNotThrow(registerSecondMove);
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
});