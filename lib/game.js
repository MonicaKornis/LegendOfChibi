let Player = require('./player.js');
let Background = require('./background.js');
let Token = require('./token.js');


class Game {
  constructor(gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.player = new Player(12,12,2 * Math.PI,'red');
    this.tokens = [];
    this.backgroundCtx = backgroundCtx;
    this.gameCtx = gameCtx;
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.jump = this.jump.bind(this);
    this.move = this.move.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.createTokens();
    this.setEventListeners = this.setEventListeners.bind(this);
    this.setEventListeners();
    this.aliens = [];
  }

  renderBackground(ctx) {
    new Background(0,0).draw(ctx);
  }

  createTokens(ctx) {
    for (let i = 0; i < 8; i++) {
      this.tokens.push( new Token(this.gameCtx,i));
    }
  }

  renderTokens() {
      debugger
      let gameCtx = this.gameCtx;
    this.tokens.forEach( function(token) {
      debugger
      token.draw(gameCtx);
    });
  }

  jump(){
    this.player.toggleJump(this.gameCtx);
  }

  move(e) {
    e.preventDefault();
    // debugger
    if(e.code === 'ArrowDown') {
      this.player.moveDown(this.gameCtx);
    } else if (e.code === 'ArrowUp') {
      this.player.moveUp(this.gameCtx);
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
    }
  }

  setEventListeners() {
    window.addEventListener('keydown', this.move);
  }


  start(gameCtx,backgroundCtx) {
    debugger
    this.renderBackground(backgroundCtx);
    this.draw(gameCtx);
    this.renderTokens();
  }

  draw(ctx) {
    ctx.clearRect(125, 125, 125, 125);
    this.player.draw(ctx);

  }

}

module.exports = Game;
