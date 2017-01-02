function GameRule() {
  this.previousMove = null;
}

GameRule.prototype.registerMove = function(pos) {
  if (this.previousMove === null || isValidMove(this.previousMove, pos)) {
    this.previousMove = pos;
    return true;
  } else {
    throw('Move is against rule');
  }
};

function isValidMove(previousMove, pos) {
  let allowedGrid = previousMove.slice(1);
  let isValid = true;

  for (let i = 0; i < allowedGrid.length; i++) {
    if (allowedGrid[i] !== pos[i]) isValid = false;
  }

  return isValid;
}

module.exports = GameRule;