;(() => {
  if (window.TTT == undefined) window.TTT = {};
  const Board = TTT.Board;
  const MiniBoard = TTT.MiniBoard;

  function LargeBoard () {
    this.grid = Board.newGrid(MiniBoard);
    this.validGrids = Board.allGrids;
    // this.marks = marks;
  }

  if (TTT.LargeBoard === undefined) {
    TTT.LargeBoard = LargeBoard;
  }

  LargeBoard.prototype = Object.create(Board.prototype);

  Board.allGrids = ['0,0', '0,1', '0,2', '1,0', '1,1', '1,2', '2,0', '2,1', '2,2'];

  LargeBoard.prototype.loadSavedBoard = function(boardObj) {
    this.validGrids = boardObj.validGrids;
    this.grid = Board.loadGrid(MiniBoard, boardObj.grid);
  };

  // LargeBoard.prototype.isEmptyPos = function (pos) {
  //   return (!this.grid[pos[0]][pos[1]].winner && !this.grid[pos[0]][pos[1]].isFull());
  // };

  LargeBoard.prototype.isEmptyPos = function (pos) {
    return (!this.grid[pos].winner && !this.grid[pos].isFull());
  };

  LargeBoard.prototype.placeMark = function (gridPos, pos, mark) {
    var isValidGrid = this.validGrids.indexOf(gridPos.toString()) !== -1;

    if (isValidGrid) {
      var isValidPos = this.grid[gridPos[0]][gridPos[1]].placeMark(pos, mark);
      if (isValidPos) {
        this.setValidGrid(pos);
        return true;
      }
    }
    return false;
  };

  LargeBoard.prototype.setValidGrid = function (pos) {
    if (!this.grid[pos[0]][pos[1]].isFull()) {
      this.validGrids = [pos.toString()];
    } else {
      this.validGrids = Board.allGrids;
    }
  };

  LargeBoard.prototype.winnerHelper = function (posSeq) {
    for (var markIdx = 0; markIdx < Board.marks.length; markIdx++) {
      var targetMark = Board.marks[markIdx];
      var winner = true;
      for (var posIdx = 0; posIdx < 3; posIdx++) {
        var pos = posSeq[posIdx];
        var mark = this.grid[pos[0]][pos[1]].winner;

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
