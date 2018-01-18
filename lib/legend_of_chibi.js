const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  // debugger
  let gameCanvas = document.getElementById('game-canvas');
  let ctx;

  if (gameCanvas.getContext) {
    ctx = gameCanvas.getContext('2d');
    let game = new Game(12,12);
    game.start(ctx);
  }

});
