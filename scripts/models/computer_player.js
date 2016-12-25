;(() => {
  const Player = TTT.Player;
  const Util = TTT.Util;

  if (window.TTT == undefined) window.TTT = {};

  // Computer Player
  function ComputerPlayer(mark, game) {
    Player.call(this, mark, game);
  }

  if (TTT.ComputerPlayer === undefined) {
    TTT.ComputerPlayer = ComputerPlayer;
  }

  ComputerPlayer.prototype = Object.create(Player.prototype);

  ComputerPlayer.prototype.play = function (updateView) {
    var validPosArr = this.game.board.validGrids;
    var randIdx = Util.randomIdx(validPosArr.length);
    var gridPos = Util.parsePosFromStr(validPosArr[randIdx]);
    validPosArr = this.game.board.grid[gridPos[0]][gridPos[1]].validGrids;
    randIdx = Util.randomIdx(validPosArr.length);
    var pos = Util.parsePosFromStr(validPosArr[randIdx]);

    setTimeout(
      this.makeMove.bind(this, gridPos, pos, updateView),
      600
    );
  };
})();