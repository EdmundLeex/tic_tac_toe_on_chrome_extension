$(document).ready(function () {
  const bg = chrome.extension.getBackgroundPage();
  // var game = new bg.Game();
  var gameController = new GameController($(".game"));
  // gameController.initBoard();
  // gameController.bindEvents();
});