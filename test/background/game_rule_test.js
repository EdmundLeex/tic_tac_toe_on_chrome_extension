import GameRule from '../../app/background/src/models/game_rule';
import { getRandomPos, getAnotherRandomPos } from '../test_helper';
import assert from 'assert';

describe('GameRule', () => {
  let gameRule = null;

  beforeEach(() => {
    gameRule = new GameRule();
  });

  describe('#registerMove()', () => {
    it('registers valid moves', () => {
      let registerFirstMove = gameRule.registerMove.bind(gameRule, [8, 0]);
      let registerSecondMove = gameRule.registerMove.bind(gameRule, [0, 1]);

      assert.doesNotThrow(registerFirstMove);
      assert.doesNotThrow(registerSecondMove);
    });

    it('throws error on invalid move', () => {
      let randPos = [getRandomPos(), getRandomPos()];
      gameRule.registerMove(randPos);
      let invalidRandPos = [getAnotherRandomPos(randPos[1]), getRandomPos()];
      let registerInvalidMove = gameRule.registerMove.bind(gameRule, invalidRandPos);

      assert.throws(registerInvalidMove, 'Invalid move');
    });
  });
});