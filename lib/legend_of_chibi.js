const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let gameCanvas = document.getElementById('game-canvas');
  gameCanvas.setAttribute('tabindex','0');
  let backgroundCanvas = document.getElementById('background-canvas');

  let backgroundCtx = backgroundCanvas.getContext('2d');
  let gameCtx = gameCanvas.getContext('2d');

  const game = new Game(gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  game.start(gameCtx, backgroundCtx);
});
