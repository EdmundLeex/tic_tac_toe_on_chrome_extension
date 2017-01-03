import Board from './board';
import GameRule from './game_rule';

function Game(options) {
  this.level = options.level;
  this.currentPlayer = options.players[0];
  this.nextPlayer = options.players[1];
  this.board = null;
  this.gameRule = null;
}

Game.newGame = (options = {}) => {
  let defaultOptions = {
    level: 2,
    players: [null, null]
  };

  for (let key in defaultOptions) {
    if (options[key] === undefined) options[key] = defaultOptions[key];
  }

  let game = new Game(options);
  game.board = Board.newBoard(options);
  game.gameRule = new GameRule(game.board);

  return game;
};

Game.prototype.makeMove = function (pos) {
  debugger;
  if (this.gameRule.isValidMove(pos) && this.board.isValidPos(pos)) {
    this.gameRule.registerMove(pos);
    this.board.placeMark(pos, this.currentPlayer.mark);

    swapTurn(this);
  } else {
    throw 'Invalid move';
  }
};

function swapTurn(game) {
  let currentPlayer = game.currentPlayer;
  let nextPlayer = game.nextPlayer;

  game.currentPlayer = nextPlayer;
  game.nextPlayer = currentPlayer;
}

module.exports = Game;