import Board from '../../app/background/src/models/board';
import assert from 'assert';

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
      mark = ['o', 'x'][getRandomPos(2)];
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

    function getRandomPos(ceiling = 9) {
      return Math.floor(Math.random() * ceiling);
    }

    function getAnotherRandomPos(pos) {
      let randPos = getRandomPos();
      if (randPos === pos) {
        return getAnotherRandomPos(pos);
      } else {
        return randPos;
      }
    }
  });
});