;(function () {
  const bg = chrome.extension.getBackgroundPage();
  const TTT = bg.TTT;
  const Player = TTT.Player;
  const LargeBoard = TTT.LargeBoard;
  const ComputerPlayer = TTT.ComputerPlayer;
  const Util = TTT.Util;
  const Api = TTT.Api;
  const Game = TTT.Game;

  // if (typeof window.TTT === "undefined") {
  //   var TTT = window.TTT = {};
  // }
  function GameController ($el) {
<<<<<<< Updated upstream
    var that = this;
    Util.getGameFromStorage(function (gameInStorage) {
      if (gameInStorage.game === undefined) {
        that.game = new TTT.Game();
      } else {
        var gameObj = JSON.parse(gameInStorage.game);
        that.game = Game.initFromSavedGame(gameObj);
      }
      that.$el = $el;
      console.log(that);

      that.initBoard();
=======
    Util.getGameFromStorage(function (gameInStorage) {
      if (gameInStorage.game === undefined) {
        this.game ||= new TTT.Game();
      } else {
        var gameObj = JSON.parse(gameInStorage.game);
        this.game = Game.initFromSavedGame(gameObj);
      }

      this.$el = $el;
>>>>>>> Stashed changes
    });
  };

  if (window.GameController === undefined) {
    window.GameController = GameController;
  }

  GameController.prototype.initBoard = function () {
    setupBoard(this.$el, this.game);

    bindClick(this.game);
  };

  GameController.prototype.bindEvents = function () {
    var that = this;
    document.getElementById('reset').addEventListener('click', function (e) {
      e.preventDefault();
      e.target.textContent = "RESTART";
      reset(that.game);
      $('#next-move').html(that.game.currentPlayer.mark);
    });
  };

  function reset(game) {
    var vsAI = $('#ai-toggle').is(':checked');
    var player1 = new Player('x');
    var player2;

    if (vsAI) {
      player2 = new ComputerPlayer('o');
    } else {
      player2 = new Player('o');
    }
    // player1.oponent = player2;
    // player2.oponent = player1;
    // var game = new window.TTT.Game([player1, player2]);
    game.addPlayers([player1, player2]);
    game.reset();
    resetView();
  }

  function makeMove(squareId, game) {
    if (game.isOver()) return;

    var idArr = squareId.split('-');
    var gridId = idArr[1];
    var id = idArr[2];
    var gridPos = gridId;
    var pos = id;

    var moveMade = game.playMove(gridPos, pos, game.currentPlayer.mark);

    if (moveMade) {
      var squareId = Util.posToId(gridPos, pos);
      updateView(squareId, game);
      if (!game.winner()) {
        game.swapTurn();
        game.currentPlayer.play(updateView);
      }
    } else {
      showMessage("Invalid move");
    }

    // if (game.currentPlayer.makeMove(gridPos, pos, updateView)) {
    //   $('#next-move').html(game.currentPlayer.mark);
    // } else {
    //   showMessage("Invalid move");
    // }
    Api.postGameState(game);
    chrome.storage.local.set({
      game: JSON.stringify(game)
    }, function () { /** no op **/ });
  }

  function updateView(squareId, game) {
    var $square = $('#' + squareId);
    var mark = game.currentPlayer.mark;

    $square.html("<span class='mark " + mark + "'>" + mark + "</span>");
    $square.addClass("clicked").remove('playable');
    $square.removeClass("hoverable");

    clearMessage();
    updateGridsClasses(game);
    showEndGameView(game);
  }

  function updateGridsClasses(game) {
    $('.square').each(function () {
      var $miniSquares = $(this).find('.mini-square');
      var gridPos = getCoordById(this.id);
      var miniBoard = game.board.grid[gridPos[0]][gridPos[1]];
      if (miniBoard.isOver()) {
        var id = gridPos[0] * 3 + gridPos[1] * 3 - (gridPos[1] * 3 - gridPos[1]);
        var wonGrid = $('#' + id.toString());
        wonGrid.addClass('won-grid-' + miniBoard.winner);
      }

      if (game.board.validGrids.indexOf(gridPos[0] + ',' + gridPos[1]) === -1) {
        $miniSquares.removeClass('playable').removeClass('hoverable');
      } else {
        $miniSquares.addClass('playable').addClass('hoverable');
      }
    });

    $('.clicked').removeClass('playable');
  }

  function showEndGameView(game) {
    var mark = game.currentPlayer.mark;

    if (game.isOver()) {
      if (game.winner()) {
        $('.playable').removeClass('playable');
        showMessage("Congratulations, " + mark.toUpperCase() + " wins!");
      } else {
        showMessage("Oops... Tied?!");
      }

      $(".square").removeClass("hoverable");
    }
  }

  function showMessage(msg) {
    $("#message").html(msg);
  }

  function clearMessage() {
    $("#message").html("");
  }

  function setupBoard($main, game) {
    var $elem = $('<ul id="board"></ul>');

    $main.append($elem);
    var toInsert = "";
    var board = game.board;
    for (var i = 0; i < 9; i++) {
      var coord = getCoordById(i);
      var miniBoard = board.grid[coord[0]][coord[1]];
      var playable = false;
      if (board.validGrids.indexOf(coord.join(',')) !== -1) playable = true;
      toInsert = toInsert + "<li class='square grid' id=" + i + ">" + setupMiniBoard(i, miniBoard, playable) + "</li>";
    }
    $elem.html(toInsert);

    // $('#next-move').html(game.nextPlayer.mark);
  }

  function setupMiniBoard(id, miniBoard, playable) {
    var toInsert = "";
    var wonGridClass = '';
    if (miniBoard.isOver()) wonGridClass = 'won-grid-' + miniBoard.winner;

    for (var i = 0; i < 9; i++) {
      var coord = getCoordById(i);
      var mark = miniBoard.grid[coord[0]][coord[1]];
      var square = '';
      var cssClass = 'mini-square grid hoverable ' + wonGridClass;
      if (playable) cssClass += ' playable';
      if (mark !== null) square = "<span class='mark " + mark + "'>" + mark + "</span>";
      toInsert = toInsert + "<li class='" + cssClass + "'id=mini-" + id + "-" + i + ">" + square + "</li>";
    }

    return '<ul class="mini-grid">' + toInsert + '</ul>';
  }

  function resetView() {
    $('.won-grid-o').removeClass('won-grid-o');
    $('.won-grid-x').removeClass('won-grid-x');
    $('.mini-square')
      .removeClass('clicked')
      .addClass('hoverable')
      .addClass('playable')
      .children()
      .empty();
  }

  function bindClick(game) {
    $('#board').on('click', function (e) {
      var elId = e.target.id;
      makeMove(elId, game);
    });
  }

  function getCoordById(id) {
    return [Math.floor(parseInt(id) / 3), Math.floor(parseInt(id) % 3)];
  }
})();
