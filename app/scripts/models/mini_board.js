// var Board = require("./board");

;(() => {
  if (window.TTT == undefined) window.TTT = {};
  const Board = TTT.Board;

  function MiniBoard () {
    this.grid = Board.newGrid(null);
    this.validGrids = Board.allGrids;
    // this.marks = marks;
  }

  if (TTT.MiniBoard === undefined) {
    TTT.MiniBoard = MiniBoard;
  }

  MiniBoard.prototype = Object.create(Board.prototype);

  MiniBoard.prototype.isEmptyPos = function (pos) {
    return (this.grid[pos[0]][pos[1]] === null);
  };

  MiniBoard.prototype.placeMark = function (pos, mark) {
    if (!this.isEmptyPos(pos)) return false;
    this.grid[pos[0]][pos[1]] = mark;
    this.validGrids = this.validGrids.filter(function (posStr) {
      return posStr !== pos.join(',');
    });

    return true;
  };

  MiniBoard.prototype.winnerHelper = function (posSeq) {
    for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
      var targetMark = Board.marks[markIdx];
      var winner = true;
      for (var posIdx = 0; posIdx < 3; posIdx++) {
        var pos = posSeq[posIdx];
        var mark = this.grid[pos[0]][pos[1]];

        if (mark != targetMark) {
          winner = false;
        }
      }

      if (winner) {
        return targetMark;
      }
    }

    return null;
  };
})();
