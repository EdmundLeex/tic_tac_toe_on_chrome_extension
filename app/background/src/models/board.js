function Board (options) {
  this.winner = null;
  this.level = options.level;
}

Board.marks = ["x", "o"];

Board.winningSequences = [
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

Board.newBoard = function (options = { level: 2 }) {
  var level = options.level;
  if (level === 0) { return null; }
  level--;

  var board = new Board(options);
  board.grid = [];

  for (var i = 0; i < 9; i++) {
    board.grid.push(Board.newBoard({ level: level }));
  }

  return board;
};

Board.loadBoard = function (boardObj) {
  var level = boardObj.level;
  var winner = boardObj.winner;

  var board = new Board({ level: level });
  board.grid = [];
  board.winner = winner;
  board.level = level;

  for (var i = 0; i < 9; i++) {
    if (level === 1) {
      board.grid[i] = boardObj.grid[i];
    } else {
      board.grid[i] = Board.loadBoard(boardObj.grid[i]);
    }
  }

  return board;
}

Board.prototype.placeMark = function(pos, mark) {
  if (!this.isValidPos(pos)) { throw new Error('Invalid placement'); }

  let posClone = pos.slice(0);
  let idx = posClone.shift();
  if (posClone.length === 0) {
    this.grid[idx] = mark;
  } else {
    this.grid[idx].placeMark(posClone, mark);
  }

  updateWinner(this);
  return true;
};

Board.prototype.isFull = function() {
  let isFull = true;

  for (var i = 0; i < 9; i++) {
    if (this.level === 1) {
      isFull = !isEmptyPos([i], this);
    } else if (this.level > 1) {
      isFull = this.grid[i].isFull();
    } else {
      throw new Error('Invalid board level');
    }

    if (!isFull) return false;
  }
  return true;
};

Board.prototype.isEmptyPos = function(pos) {
  return isEmptyPos(pos, this);
};

Board.prototype.isValidPos = function(pos) {
  return posMatchGridLevel(pos, this) && isWithinBound(pos);
};

Board.prototype.isOver = function () {
  if (this.winner !== null) {
    return true;
  }

  return this.isFull();
};

function updateWinner(board) {
  if (board === null) return;
  if (board.winner !== null) return;

  Board.marks.forEach((mark) => {
    if (boardHasWinningSequenceFromMark(board, mark)) {
      board.winner = mark;
      return;
    }
  });
}

function boardHasWinningSequenceFromMark(board, mark) {
  let hasWinner = true;
  Board.winningSequences.some((winningSequence) => {
    if (board.level === 1) {
      hasWinner = (
        board.grid[winningSequence[0]] === mark &&
        board.grid[winningSequence[1]] === mark &&
        board.grid[winningSequence[2]] === mark
      );
    } else if (board.level > 1) {
      hasWinner = (
        board.grid[winningSequence[0]].winner === mark &&
        board.grid[winningSequence[1]].winner === mark &&
        board.grid[winningSequence[2]].winner === mark
      );
    } else {
      throw new Error('Invalid board level');
    }

    if (hasWinner) return true;
  });

  return hasWinner;
}

function isWithinBound(pos) {
  let isWithinBound = true;

  pos.forEach((idx) => {
    if (idx > 8 || idx < 0) { isWithinBound = false; }
  });

  return isWithinBound;
}

function isEmptyPos(pos, board) {
  let grid = board.grid;
  let posClone = pos.slice(0);
  let idx = posClone.shift();
  if (posClone.length === 0) {
    return grid[idx] === null;
  } else {
    return isEmptyPos(posClone, grid[idx]);
  }
}

function posMatchGridLevel(pos, board) {
  return pos.length === board.level;
}

module.exports = Board;