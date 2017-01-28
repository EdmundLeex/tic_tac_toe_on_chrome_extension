const Board = require('./board');
const GameRule = require('./game_rule');

function Game(options) {
  this.level = options.level;
  this.currentPlayer = options.currentPlayer || options.players[0];
  this.nextPlayer = options.nextPlayer || options.players[1];
  this.board = null;
  this.gameRule = null;
  this.winner = null;
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

Game.loadGame = function (gameObj) {
  let options = {
    level: gameObj.level,
    currentPlayer: gameObj.currentPlayer,
    nextPlayer: gameObj.nextPlayer
  };

  let game = new Game(options);
  game.board = Board.loadBoard(gameObj.board);
  return game;
};

Game.prototype.makeMove = function (pos) {
  if (this.gameRule.isValidMove(pos) && this.board.isValidPos(pos)) {
    this.gameRule.registerMove(pos);
    this.board.placeMark(pos, this.currentPlayer.mark);

    swapTurn(this);
    updateWinner(this);
  } else {
    throw new Error('Invalid move');
  }
};

Game.prototype.isOver = function() {
  return this.board.isOver();
};

function updateWinner(game) {
  if (game.board.winner !== null) {
    let players = [game.currentPlayer, game.nextPlayer];
    game.winner = matchPlayerWithMark(players, game.board.winner);
  }
}

function matchPlayerWithMark(players, mark) {
  for (let i = 0; i < players.length; i++) {
    if (players[i].mark === mark) return players[i];
  }
}

function swapTurn(game) {
  let currentPlayer = game.currentPlayer;
  let nextPlayer = game.nextPlayer;

  game.currentPlayer = nextPlayer;
  game.nextPlayer = currentPlayer;
}

module.exports = Game;