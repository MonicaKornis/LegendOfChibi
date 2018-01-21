let Player = require('./player.js');
let Background = require('./background.js');
let Token = require('./token.js');


class Game {
  constructor(gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.player = new Player(12,12,2 * Math.PI,'red');
    this.tokens = [];
    this.tokenCoords = [];
    this.backgroundCtx = backgroundCtx;
    this.gameCtx = gameCtx;
    this.start = this.start.bind(this);
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.jump = this.jump.bind(this);
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.playerRecievePoints = this.playerRecievePoints.bind(this);
    this.createTokens();
    this.setEventListeners();
    this.aliens = [];
    this.renderTokens();
  }

  renderBackground(ctx) {
    new Background(0,0).draw(this.backgroundCtx);
  }

  createTokens(ctx) {
    for (let i = 0; i < 8; i++) {
      this.tokens.push( new Token(this.gameCtx,i));
    }
  }

  playerRecievePoints() {
    // debugger
    for (var i = 0; i < this.tokens.length; i++) {
        if(this.tokens[i].xCoord <= this.player.centerX && this.player.centerX > this.tokens[i].xCoord ) {
          console.log('WEEE');
          this.player.points += this.tokens[i].points;
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);
        }
    }
    console.log(this.player.points);
  }

  renderTokens() {
    let x = 0;
    let width = 680;
    let min = 0 - width;
    let count = 1;
      // debugger
    let gameCtx = this.gameCtx;
    const loop = () => {
      this.tokens.forEach( function(token) {


        token.xCoord = x + width;
        token.draw(gameCtx);

        x -= count;
        if (x < min ) {
          x = 0;
        }
      });
    };

      setInterval(loop,117);
  }

  jump(){
    this.player.toggleJump(this.gameCtx);
  }

  move(e) {
    e.preventDefault();
    if(e.code === 'ArrowDown') {
      this.player.moveDown(this.gameCtx);
      this.draw(this.gameCtx);
    } else if (e.code === 'ArrowUp') {
      this.player.moveUp(this.gameCtx);
      this.draw(this.gameCtx);
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
      this.draw(this.gameCtx);
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
      this.draw(this.gameCtx);
    }
    this.playerRecievePoints();
  }

  setEventListeners() {
    window.addEventListener('keydown', this.move);
  }


  start(gameCtx,backgroundCtx) {
    // debugger
    this.renderBackground(backgroundCtx);
    this.draw(gameCtx);
    window.requestAnimationFrame(this.start);
  }

  draw(ctx) {
    // debugger
    ctx.clearRect(0,0,350,100);
    this.player.draw(ctx);
    this.playerRecievePoints();
    this.gameCtx.font = `48px sans-serif`;
    let gradient = ctx.createLinearGradient(0,0,this.gameCanvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","yellow");
    gradient.addColorStop("1.0","red");
    ctx.fillStyle = gradient;
    this.gameCtx.fillText(`Life points: ${this.player.points}`, 10, 50);
  }

}

module.exports = Game;
