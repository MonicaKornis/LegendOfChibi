const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let gameCanvas = document.getElementById('game-canvas');

  let ctx = gameCanvas.getContext('2d');
  const game = new Game();
  game.start(ctx);
});
