import Board from '../../app/background/src/models/board';
import assert from 'assert';

describe('Board', () => {
  describe('::newBoard()', () => {
    it ('makes a board with one level grid given an option as { level: 1 }', () => {
      let board = Board.newBoard({ level: 1 });
      assert.equal(board.grid.constructor, Array);
      assert.equal(board.winner, null);

      for (let i = 0; i < 9; i++) {
        assert.equal(board[i], null);
      }
    });

    it('makes a board with two level grid by default', () => {
      let board = Board.newBoard();
      assert.equal(board.grid.constructor, Array);
      assert.equal(board.winner, null);

      for (let i = 0; i < 9; i++) {
        let innerBoard = board.grid[i];
        assert.equal(innerBoard.constructor, Board);
        assert.equal(innerBoard.grid.constructor, Array);

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

      for (let i = 0; i < 9; i++) {
        let innerBoard = board.grid[i];
        assert.equal(innerBoard.constructor, Board);
        assert.equal(innerBoard.grid.constructor, Array);

        for (let j = 0; j < 9; j++) {
          let innestBoard = innerBoard.grid[j];
          assert.equal(innestBoard.constructor, Board);
          assert.equal(innestBoard.grid.constructor, Array);

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
      let board = Board.newBoard({ level: 1 });

      it('places mark onto board according to the given pos', () => {
        let pos = [getRandomPos()];
        board.placeMark([pos], mark);
        let grid = board.grid;

        assert.equal(grid[pos], mark);

        let randPos = [getAnotherRandomPos(pos)];
        assert.equal(grid[randPos], null);
      })
    });

    describe('when the board is two level', () => {
      var board = Board.newBoard();

      it('places mark onto board according to the given pos', () => {
        let pos = [getRandomPos(), getRandomPos()];
        board.placeMark(pos, mark);
        let grid = board.grid;
        let innerBoard = grid[pos[0]];
        let innerGrid = innerBoard.grid;
        assert.equal(innerGrid[pos[1]], mark);

        let randPos = [getAnotherRandomPos(pos), getAnotherRandomPos(pos)];
        let randInnerBoard = board.grid[randPos[0]];
        assert.equal(randInnerBoard.grid[randPos[1]], null);
      });
    });

    function getRandomPos(ceiling = 9) {
      return Math.floor(Math.random() * ceiling);
    }

    function getAnotherRandomPos(pos) {
      let randPos = getRandomPos();
      while (randPos === pos) { randPos = getRandomPos(); }
      return randPos;
    }
  });
});