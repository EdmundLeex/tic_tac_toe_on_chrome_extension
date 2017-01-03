import Board from './board';

function GameRule(board) {
  this.previousPos = null;
  this.board = board;
}

GameRule.winningSequences = [
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

GameRule.prototype.isValidMove = function(pos) {
  return this.board.isEmptyPos(pos) && isAllowedPos(this.previousPos, pos);
};

GameRule.prototype.registerMove = function(pos) {
  if (isValidMove(this.board, this.previousPos, pos)) {
    this.previousPos = pos;
    // check winner?
    // if there is one, set winner
    return true;
  } else {
    throw('Move is against rule');
  }
};

// function isValidMove(board, previousPos, pos) {
//   return board.isEmptyPos(pos) && isAllowedPos(previousPos, pos);
// }

function isAllowedPos(previousPos, newPos) {
  if (previousPos === null) return true;

  let allowedGrid = previousPos.slice(1);
  let isAllowed = true;

  for (let i = 0; i < allowedGrid.length; i++) {
    if (allowedGrid[i] !== newPos[i]) isAllowed = false;
  }

  return isAllowed;
}

function updateWinners(board) {
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
  GameRule.winningSequences.some((winningSequence) => {
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
      throw('Invalid board level');
    }

    if (hasWinner) return true;
  });

  return hasWinner;
}

module.exports = GameRule;