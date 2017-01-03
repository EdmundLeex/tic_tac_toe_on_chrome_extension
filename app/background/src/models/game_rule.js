import Board from './board';

function GameRule(board) {
  this.previousPos = null;
  this.board = board;
}

GameRule.prototype.isValidMove = function(pos) {
  return this.board.isEmptyPos(pos) && isAllowedPos(this.previousPos, pos);
};

GameRule.prototype.registerMove = function(pos) {
  if (this.isValidMove(pos)) {
    this.previousPos = pos.slice(0);
    // check winner?
    // if there is one, set winner
    return true;
  } else {
    throw('Move is against rule');
  }
};

function isAllowedPos(previousPos, newPos) {
  if (previousPos === null) return true;

  let allowedGrid = previousPos.slice(1);
  let isAllowed = true;

  for (let i = 0; i < allowedGrid.length; i++) {
    if (allowedGrid[i] !== newPos[i]) isAllowed = false;
  }

  return isAllowed;
}

module.exports = GameRule;