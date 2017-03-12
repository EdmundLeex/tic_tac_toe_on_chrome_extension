const Board = require('./board');

function GameRule(board) {
  this.previousPos = null;
  this.board = board;
  this.allowedGrid = null;
}

GameRule.prototype.isValidMove = function(pos) {
  return this.board.isEmptyPos(pos) && isAllowedPos(this.previousPos, pos, this.board);
};

GameRule.prototype.registerMove = function(pos) {
  if (this.isValidMove(pos)) {
    this.previousPos = pos.slice(0);
    this.allowedGrid = allowedGrid(this.previousPos, this.board);
    // check winner?
    // if there is one, set winner
    return true;
  } else {
    throw new Error('Move is against rule');
  }
};

function allowedGrid(previousPos, board) {
  if (previousPos === null) return null;
  if (board.level > 1 && board.grid[previousPos[1]].isFull()) return null;

  return previousPos.slice(1)[0];
}

function isAllowedPos(previousPos, newPos, board) {
  if (previousPos === null) return true;
  if (board.level > 1 && board.grid[previousPos[1]].isFull()) return true;

  let allowedPos = previousPos.slice(1);

  let isAllowed = true;

  for (let i = 0; i < allowedPos.length; i++) {
    if (allowedPos[i] !== newPos[i]) isAllowed = false;
  }

  return isAllowed;
}

module.exports = GameRule;