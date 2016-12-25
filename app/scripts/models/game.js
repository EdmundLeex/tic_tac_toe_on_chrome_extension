;(() => {
  if (window.TTT == undefined) window.TTT = {};
  const LargeBoard = TTT.LargeBoard;
  const Player = TTT.Player;

  function Game () {
    this.board = new LargeBoard();
    this.players = null;
  }

  if (TTT.Game === undefined) {
    TTT.Game = Game;
  }

  Game.marks = ["x", "o"];

  Game.initFromSavedGame = function (gameObj) {
    var game = new Game();
    game.currentPlayer = new Player(gameObj.currentPlayer.mark);
    game.nextPlayer = new Player(gameObj.nextPlayer.mark);
<<<<<<< Updated upstream
    game.players = [game.currentPlayer, game.nextPlayer];

    game.board.loadSavedBoard(gameObj.board);

    return game;
=======
    game.players = [currentPlayer, nextPlayer];

    game.board.validGrids = gameObj.validGrids;

    
>>>>>>> Stashed changes
  };

  Game.prototype.isOver = function () {
    return this.board.isOver();
  };

  Game.prototype.playMove = function (gridPos, pos, mark) {
    var placedMark = this.board.placeMark(gridPos, pos, mark);
    if (placedMark) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.swapTurn = function () {
    var players = this.players;
    if (this.currentPlayer === players[0]) {
      this.currentPlayer = players[1];
      this.nextPlayer = players[0];
    } else {
      this.currentPlayer = players[0];
      this.nextPlayer = players[1];
    }
  };

  Game.prototype.winner = function () {
    return this.board.winner;
  };

  Game.prototype.reset = function () {
    this.board = new LargeBoard();
    this.currentPlayer = this.players[0];
    this.nextPlayer = this.players[1];
  };

  Game.prototype.addPlayers = function (players) {
    this.players = players;
    // this.players.forEach(function(player){
    //   player.game = this;
    // }, this);
    this.currentPlayer = this.players[0];
    this.nextPlayer = this.players[1];
  }
})();

