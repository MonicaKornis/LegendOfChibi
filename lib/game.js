let Player = require('./player.js');
let Background = require('./background.js');
let Token = require('./token.js');
let Alien = require('./alien.js');

class Game {
  constructor(gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.player = new Player(12,12,2 * Math.PI,'red');
    this.heart = new Image();
    this.heart.src = './images/heart.png';
    this.alien = new Alien();
    this.tokens = [];
    this.gameCtx = gameCtx;
    this.background = new Background(0, 0);
    this.backgroundCtx = backgroundCtx;
    this.start = this.start.bind(this);
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.printHeart = this.printHeart.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
    // this.createEvilTokens =  this.createEvilTokens.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.playerRecievePoints = this.playerRecievePoints.bind(this);
    this.createTokens(8);
    this.setEventListeners();
    this.difficulty = 2;
    this.aliens = [];
    this.fps = 30;
    this.now;
    this.then = Date.now();
    this.interval = 3500/this.fps;
    this.delta;

  }
//
  renderBackground() {
    this.background.draw(this.backgroundCtx);
  }

  createTokens(num) {
    for (let points = 0; points < num; points++) {
      if(points === 0) {

      for(let i = 0; i < this.difficulty ; i++) {
        debugger
        this.tokens.push( new Token(this.gameCtx, -5, 'death-token'));
        }

      } else {
        this.tokens.push( new Token(this.gameCtx, points, 'token'));
      }
    }
  }

  // createEvilTokens() {
  //   for (let i = 0; i <= this.difficulty; i++) {
  //     // debugger
  //     this.tokens.push( new Token(this.gameCtx, i ,'death token'));
  //   }
  // }

  playerRecievePoints() {
    let recieved = false;
    for (var i = 0; i < this.tokens.length; i++) {
        if((this.tokens[i].xCoord >= this.player.centerX && this.tokens[i].xCoord <= this.player.centerX + 40) &&
           (this.tokens[i].yCoord >= this.player.centerY && this.tokens[i].yCoord <= this.player.centerY + 40)) {
          console.log('WEEE');
          this.player.points += this.tokens[i].points;
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);
          this.printHeart();
        }
    }
  }

printHeart() {
  this.gameCtx.drawImage(this.heart,0,0,
  this.heart.naturalWidth, this.heart.naturalHeight, this.player.centerX + 20 , this.player.centerY -30,
  this.heart.naturalWidth, this.heart.naturalHeight);
}

  renderTokens(gameCtx) {
      this.tokens.forEach( function(token) {
        token.xCoord -= 2;
        token.draw(gameCtx);
      });
  }

  createMoreTokens() {
    if(this.tokens.length < 3 ) {
      this.createTokens(4);
    }
  }

  filterTokens() {
    this.tokens = this.tokens.filter((token) => token.xCoord > 4);
  }

  move(e) {
    e.preventDefault();
    if(e.code === 'ArrowDown') {
      this.player.moveDown(this.gameCtx);
    } else if (e.code === 'ArrowUp') {
      this.player.moveUp(this.gameCtx);
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
    }
    this.playerRecievePoints();
  }

  setEventListeners() {
    window.addEventListener('keydown', this.move);
  }


  start(ctx) {
    // debugger
    requestAnimationFrame(this.start);
    let now = Date.now();
    this.delta = now - this.then;
    // debugger
    if (this.delta > this.interval) {
      // this.alien.xCoord -=1;
      this.gameCtx.clearRect(0,0,680,650);
      this.alien.draw(this.gameCtx);
        this.renderBackground(this.backgroundCtx);
        this.draw(this.gameCtx);
        this.renderTokens(this.gameCtx);
        this.then = now - (this.delta % this.interval);
      }
    this.createMoreTokens();
  }

  draw() {
    // debugger
    this.player.draw(this.gameCtx);this.playerRecievePoints();
    this.filterTokens();
    this.gameCtx.font = `48px sans-serif`;
    let gradient = this.gameCtx.createLinearGradient(0,0,this.gameCanvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","yellow");
    gradient.addColorStop("1.0","red");
    this.gameCtx.fillStyle = gradient;
    this.gameCtx.fillText(`Life points: ${this.player.points}`, 10, 50);

  }

}

module.exports = Game;
