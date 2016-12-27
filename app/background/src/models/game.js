import Board from './board';

function Game(options) {
  this.level = options.level;
  this.currentPlayer = options.players[0];
  this.nextPlayer = options.players[1];
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

  return game;
};

Game.prototype.makeMove = function (pos) {
  this.board.placeMark(pos, this.currentPlayer.mark);
  swapTurn(this);
};

function swapTurn(game) {
  let currentPlayer = game.currentPlayer;
  let nextPlayer = game.nextPlayer;

  game.currentPlayer = nextPlayer;
  game.nextPlayer = currentPlayer;
}

module.exports = Game;