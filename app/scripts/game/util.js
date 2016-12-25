;(() => {
  if (window.TTT == undefined) window.TTT = {};

  if (TTT.Util === undefined) {
    TTT.Util = {
      posToId: function (gridPos, pos) {
        var gridId = (gridPos[0] * 3 + gridPos[1]).toString();
        var posId = (pos[0] * 3 + pos[1]).toString();
        return ["mini", gridId, posId].join("-");
      },
      randomIdx: function (ceiling) {
        return Math.floor(Math.random() * ceiling);
      },
      parsePosFromStr: function (posStr) {
        return posStr.split(",").map(function (n) { return parseInt(n); });
      },
      getGameFromStorage: function (callback) {
        chrome.storage.local.get('game', callback);
      }
    }
  }
})();