const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let gameCanvas = document.getElementById('game-canvas');
  let backgroundCanvas = document.getElementById('background-canvas');
  let backgroundCtx = backgroundCanvas.getContext('2d');
  let gameCtx = gameCanvas.getContext('2d');
  const start = new Start(document,gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  start.message();
  start.play();

  // const game = new Game(gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  //
  // game.start();
});

class Start {
  constructor(document,gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.document = document;
    this.gameCtx = gameCtx;
    this.backgroundCtx = backgroundCtx;
    this.gameCanvas = this.gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.playing = false;
  }

  message() {
    this.gameCtx.clearRect(0, 0, 630, 680);
    this.gameCtx.fillStyle = "#3366ff";
    this.gameCtx.fillRect(0, 0, 630, 680);
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '50px Inconsolata';
    this.gameCtx.fillText('The Legend of Chibi', 130, 80);
    this.gameCtx.font = '25px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.fillText('Press Space To Begin', 270, 170);
    this.gameCtx.fillText('watch out for the evil aliens!', 170, 210);
    this.gameCtx.font = '18px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.fillText('Use the up and down arrows to collect tokens', 275, 325);
    this.gameCtx.font = '18px Inconsolata';
    this.gameCtx.fillText('Just watch out for the death orbs!', 300, 350);
  }


  play(playing) {
    // this.document.getElementById("music").style.visibility = "hidden";
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      e.preventDefault();
      if (e.keyCode === 32 && !this.playing) {
        this.playing = true;
        // return new Game(this.document, this.ctx, this.playing, this.initialized);
        const game = new Game(this.gameCtx, this.backgroundCtx, this.gameCanvas, this.backgroundCanvas);
        game.start();
      }
      if (e.keyCode === 32 && this.playing) {
        const start = new Start();
      }
    });
  }

}
