import assert from 'assert';
import Board from '../../app/background/src/models/board';
import { getRandomPos, getAnotherRandomPos } from '../test_helper';

describe('Board', () => {
  describe('::newBoard()', () => {
    it ('makes a board with one level grid given an option as { level: 1 }', () => {
      let board = Board.newBoard({ level: 1 });
      assert.equal(board.grid.constructor, Array);
      assert.equal(board.winner, null);
      assert.equal(board.level, 1);

      for (let i = 0; i < 9; i++) {
        assert.equal(board[i], null);
      }
    });

    it('makes a board with two level grid by default', () => {
      let board = Board.newBoard();
      assert.equal(board.grid.constructor, Array);
      assert.equal(board.winner, null);
      assert.equal(board.level, 2);

      for (let i = 0; i < 9; i++) {
        let innerBoard = board.grid[i];
        assert.equal(innerBoard.constructor, Board);
        assert.equal(innerBoard.grid.constructor, Array);
        assert.equal(innerBoard.level, 1);

        for (let j = 0; j < 9; j++) {
          let cell = innerBoard.grid[j];
          assert.equal(cell, null);
        }
      }
    });

    it('makes a board with three level grid given an option as { level: 3 }', () => {
      let board = Board.newBoard({ level: 3 });
      assert.equal(board.grid.constructor, Array);
      assert.equal(board.winner, null);
      assert.equal(board.level, 3);

      for (let i = 0; i < 9; i++) {
        let innerBoard = board.grid[i];
        assert.equal(innerBoard.constructor, Board);
        assert.equal(innerBoard.grid.constructor, Array);
        assert.equal(innerBoard.level, 2);

        for (let j = 0; j < 9; j++) {
          let innestBoard = innerBoard.grid[j];
          assert.equal(innestBoard.constructor, Board);
          assert.equal(innestBoard.grid.constructor, Array);
          assert.equal(innestBoard.level, 1);

          for (let k = 0; k < 9; k++) {
            let cell = innestBoard.grid[k];
            assert.equal(cell, null);
          }
        }
      }
    });
  });

  describe('#placeMark()', () => {
    let mark;

    beforeEach(() => {
      mark = ['o', 'x'][getRandomPos(0, 2)];
    });

    describe('when the board is one level', () => {
      let board;

      beforeEach('initBoard', () => {
        board = Board.newBoard({ level: 1 });
      });

      it('places mark onto board according to the given pos', () => {
        let pos = [getRandomPos()];
        board.placeMark([pos], mark);
        let grid = board.grid;

        assert.equal(grid[pos], mark);

        let randPos = [getAnotherRandomPos(pos[0])];
        assert.equal(grid[randPos], null);
      });
    });

    describe('when the board is two level', () => {
      let board;

      beforeEach('initBoard', () => {
        board = Board.newBoard();
      });

      it('places mark onto board according to the given pos', () => {
        let pos = [getRandomPos(), getRandomPos()];
        board.placeMark(pos, mark);
        let grid = board.grid;
        let innerBoard = grid[pos[0]];
        let innerGrid = innerBoard.grid;
        assert.equal(innerGrid[pos[1]], mark);

        let randPos = [getAnotherRandomPos(pos[0]), getAnotherRandomPos(pos[1])];
        let randInnerBoard = board.grid[randPos[0]];
        assert.equal(randInnerBoard.grid[randPos[1]], null);
      });

      it('throws error if places mark on an occupied pos', () => {
        let pos = [getRandomPos(), getRandomPos()];
        board.placeMark(pos);

        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');
      });

      it('throws error if places mark out of bound', () => {
        let pos = [1, -1];
        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');

        pos = [-1, 1];
        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');

        pos = [0, 9];
        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');

        pos = [9, 2];
        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');
      });

      it('throws error if pos depth is higher than board level', () => {
        let pos = [1, 2, 3];
        assert.throws(board.placeMark.bind(board, pos), 'Invalid placement');
      });
    });
  });

  describe('#winner', () => {
    let board;
    beforeEach('initBoard', () => {
      board = Board.newBoard();
    });

    it("doesn't return winner if there is none", () => {
      assert.equal(board.grid[0].winner, null);
      board.placeMark([0,0], 'x');
      board.placeMark([0,3], 'x');
      board.placeMark([0,2], 'x');
      assert.equal(board.grid[0].winner, null);
    });

    describe('returns the winner of inner board', () => {
      describe('when horizontal', () => {
        it('first row', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,1], 'x');
          board.placeMark([0,2], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });

        it('second row', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,3], 'x');
          board.placeMark([0,4], 'x');
          board.placeMark([0,5], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });

        it('third row', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,6], 'x');
          board.placeMark([0,7], 'x');
          board.placeMark([0,8], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });
      });

      describe('when vertical', () => {
        it('first column', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,3], 'x');
          board.placeMark([0,6], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });

        it('second column', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,1], 'x');
          board.placeMark([0,4], 'x');
          board.placeMark([0,7], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });

        it('third column', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,2], 'x');
          board.placeMark([0,5], 'x');
          board.placeMark([0,8], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });
      });

      describe('when diagonal', () => {
        it('upper left to lower right', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,4], 'x');
          board.placeMark([0,8], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });

        it('lower left to upper right', () => {
          assert.equal(board.grid[0].winner, null);
          board.placeMark([0,6], 'x');
          board.placeMark([0,4], 'x');
          board.placeMark([0,2], 'x');
          assert.equal(board.grid[0].winner, 'x');
        });
      });
    });

    describe('returns the winner of outer board', () => {
      describe('when horizontal', () => {
        it('first row', () => {
          assert.equal(board.winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,1], 'x');
          board.placeMark([0,2], 'x');
          board.placeMark([1,0], 'x');
          board.placeMark([1,1], 'x');
          board.placeMark([1,2], 'x');
          board.placeMark([2,0], 'x');
          board.placeMark([2,1], 'x');
          board.placeMark([2,2], 'x');
          assert.equal(board.winner, 'x');
        });

        it('second row', () => {
          assert.equal(board.winner, null);
          board.placeMark([3,3], 'x');
          board.placeMark([3,4], 'x');
          board.placeMark([3,5], 'x');
          board.placeMark([4,0], 'x');
          board.placeMark([4,1], 'x');
          board.placeMark([4,2], 'x');
          board.placeMark([5,0], 'x');
          board.placeMark([5,1], 'x');
          board.placeMark([5,2], 'x');
          assert.equal(board.winner, 'x');
        });

        it('third row', () => {
          assert.equal(board.winner, null);
          board.placeMark([6,6], 'x');
          board.placeMark([6,7], 'x');
          board.placeMark([6,8], 'x');
          board.placeMark([7,0], 'x');
          board.placeMark([7,1], 'x');
          board.placeMark([7,2], 'x');
          board.placeMark([8,0], 'x');
          board.placeMark([8,1], 'x');
          board.placeMark([8,2], 'x');
          assert.equal(board.winner, 'x');
        });
      });

      describe('when vertical', () => {
        it('first column', () => {
          assert.equal(board.winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,3], 'x');
          board.placeMark([0,6], 'x');
          board.placeMark([3,0], 'x');
          board.placeMark([3,3], 'x');
          board.placeMark([3,6], 'x');
          board.placeMark([6,0], 'x');
          board.placeMark([6,3], 'x');
          board.placeMark([6,6], 'x');
          assert.equal(board.winner, 'x');
        });

        it('second column', () => {
          assert.equal(board.winner, null);
          board.placeMark([1,1], 'x');
          board.placeMark([1,4], 'x');
          board.placeMark([1,7], 'x');
          board.placeMark([4,0], 'x');
          board.placeMark([4,3], 'x');
          board.placeMark([4,6], 'x');
          board.placeMark([7,0], 'x');
          board.placeMark([7,3], 'x');
          board.placeMark([7,6], 'x');
          assert.equal(board.winner, 'x');
        });

        it('third column', () => {
          assert.equal(board.winner, null);
          board.placeMark([2,2], 'x');
          board.placeMark([2,5], 'x');
          board.placeMark([2,8], 'x');
          board.placeMark([5,0], 'x');
          board.placeMark([5,3], 'x');
          board.placeMark([5,6], 'x');
          board.placeMark([8,0], 'x');
          board.placeMark([8,3], 'x');
          board.placeMark([8,6], 'x');
          assert.equal(board.winner, 'x');
        });
      });

      describe('when diagonal', () => {
        it('upper left to lower right', () => {
          assert.equal(board.winner, null);
          board.placeMark([0,0], 'x');
          board.placeMark([0,4], 'x');
          board.placeMark([0,8], 'x');
          board.placeMark([4,0], 'x');
          board.placeMark([4,3], 'x');
          board.placeMark([4,6], 'x');
          board.placeMark([8,0], 'x');
          board.placeMark([8,3], 'x');
          board.placeMark([8,6], 'x');
          assert.equal(board.winner, 'x');
        });

        it('lower left to upper right', () => {
          assert.equal(board.winner, null);
          board.placeMark([6,6], 'x');
          board.placeMark([6,4], 'x');
          board.placeMark([6,2], 'x');
          board.placeMark([4,0], 'x');
          board.placeMark([4,3], 'x');
          board.placeMark([4,6], 'x');
          board.placeMark([2,0], 'x');
          board.placeMark([2,3], 'x');
          board.placeMark([2,6], 'x');
          assert.equal(board.winner, 'x');
        });
      });
    });
  });

  describe('#isFull()', () => {
    let board;

    describe('when it is a one level board', () => {
      beforeEach('initBoard', () => {
        board = Board.newBoard({ level: 1 });
      });

      it('returns true if the board is full', () => {
        for (let i = 0; i < 9; i++) {
          board.placeMark([i], 'x');
        }

        assert.equal(board.isFull(), true);
      });

      it ('returns false if the board is not full', () => {
        let randPos = getRandomPos();

        for (let i = 0; i < 9; i++) {
          if (randPos !== i) {
            board.placeMark([i], 'x');
          }
        }

        assert.equal(board.isFull(), false);
      });
    });

    describe('when it is a two level board', () => {
      beforeEach('initBoard', () => {
        board = Board.newBoard();
      });

      it('returns true if board is full', () => {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            board.placeMark([i, j], 'x');
          }
        }

        assert.equal(board.isFull(), true);
      });

      it('returns false if board is not full', () => {
        let randPos = [getRandomPos(), getRandomPos()];

        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (randPos[0] !== i && randPos[1] !== j) {
              board.placeMark([i, j], 'x');
            }
          }
        }

        assert.equal(board.isFull(), false);
      });
    });

  });
});