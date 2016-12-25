;(() => {
  if (window.TTT == undefined) window.TTT = {};
debugger;
  if (TTT.Api === undefined) {
    TTT.Api = {
      postGameState: function (game) {
        var param = JSON.stringify(game);
      },
      getGameState: function () {}
    };
  }


})();