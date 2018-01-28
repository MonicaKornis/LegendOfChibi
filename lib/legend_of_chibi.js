const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
  let gameCanvas = document.getElementById('game-canvas');
  let backgroundCanvas = document.getElementById('background-canvas');
  let backgroundCtx = backgroundCanvas.getContext('2d');
  let gameCtx = gameCanvas.getContext('2d');
  // let img = new Image();
  // img.src = './images/potions2.png';
  const start = new Start(document,gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  start.message();
  start.play();

  // const game = new Game(gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  //
  // game.start();
});

class Start {
  constructor(document,gameCtx,backgroundCtx,gameCanvas,backgroundCanvas,img) {
    this.document = document;
    this.gameCtx = gameCtx;
    this.backgroundCtx = backgroundCtx;
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.playing = false;
  }

  message() {
    this.gameCtx.clearRect(20, 0, 690, 720);
    this.gameCtx.fillStyle = "#3366ff";
    this.gameCtx.fillRect(20, 0, 690, 720);
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '57px Inconsolata';
    this.gameCtx.fillText('The Legend of Chibi', 122, 95);

    this.gameCtx.font = '25px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.fillText('You are a cat named Chibi Mochi trying to collect magic', 80, 200);
    this.gameCtx.fillText('potions in the Egyptian desert. However, you must watch', 83, 240);
    this.gameCtx.fillText('out for the malicious aliens who will try to steal your life',86, 280);
    this.gameCtx.fillText('points!! The game ends when you are out of life points.',87, 320);
    // this.gameCtx.drawImage(this.img, 270,270,this.img.naturalWidth, this.img.naturalHeight);
    this.gameCtx.font = '20px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '28px Inconsolata';
    this.gameCtx.fillText('Use the up and down arrows to collect tokens.', 106, 405);
    this.gameCtx.fillText('Just make sure to watch out for the death orbs!', 107, 453);

    this.gameCtx.font = '41px Inconsolata';
    this.gameCtx.fillText('Press Space To Begin', 190, 590);

  }


  play(playing) {
    // this.document.getElementById("music").style.visibility = "hidden";
    this.document.addEventListener('keypress', (e) => {
      // enter to play again, but disable once a round starts
      e.preventDefault();
      if (e.keyCode === 32 && !this.playing) {
        this.playing = true;
        // return new Game(this.document, this.ctx, this.playing, this.initialized);
        this.gameCtx.clearRect(0, 0, 720, 740);
        const game = new Game(this.gameCtx, this.backgroundCtx, this.gameCanvas, this.backgroundCanvas);
        game.start();
      }
      if (e.keyCode === 32 && this.playing) {
        const start = new Start();
      }
    });
  }

}
