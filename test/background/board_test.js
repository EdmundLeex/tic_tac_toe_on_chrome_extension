import Board from '../../app/background/src/models/board';
import assert from 'assert';

describe('Board', function() {
  describe('#newGrid()', function() {
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
});