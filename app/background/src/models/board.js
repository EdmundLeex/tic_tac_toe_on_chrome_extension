function Board () {
  this.grid = Board.newGrid();
  this.winner = null;
}

Board.marks = ["x", "o"];

Board.allGrids = [0, 1, 2, 3, 4, 5, 6, 7, 8];

Board.newGrid = function (Constructor) {
  var grid = [];

  for (var i = 0; i < 9; i++) {
    if (Constructor) {
      grid.push(new Constructor());
    } else {
      grid.push(null);
    }
  }

  return grid;
};

Board.loadGrid = function (Constructor, gridObj) {
  var grid = [];
  for (var i = 0; i < 3; i++) {
    grid.push([]);
    for (var j = 0; j < 3; j++) {
      if (Constructor) {
        grid[i][j] = new Constructor();
        grid[i][j].grid = Board.loadGrid(null, gridObj[i][j]);
      } else {
        grid[i][j] = gridObj.grid[i][j];
      }
    }
  }

  return grid;
};

Board.prototype.isValidPos = function (pos) {
  return (pos < 9 && pos > 0);
};

Board.prototype.isFull = function () {
  for (var pos = 0; pos < 9; pos++) {
    if (this.isEmptyPos(pos)) {
      return false;
    }
  }
  return true;
};

Board.prototype.isOver = function () {
  if (this.getWinner() !== null) {
    return true;
  }

  return this.isFull();
};

Board.prototype.getWinner = function () {
  var posSeqs = [
    // horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (var i = 0; i < posSeqs.length; i++) {
    if (!this.winner) {
      this.winner = this.winnerHelper(posSeqs[i]);
      if (this.winner !== null) {
        return this.winner;
      }
    }
  }

  return null;
};

Board.prototype.loadSavedBoard = function(boardObj) {
  throw('Board#loadSavedBoard is not implemented.')
};

module.exports = Board;