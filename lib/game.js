let Player = require('./player.js');
let Background = require('./background.js');
let Token = require('./token.js');
let Alien = require('./alien.js');

class Game {
  constructor(gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.player = new Player(12,12,2 * Math.PI,'red');
    this.heart = new Image();
    this.heart.src = './images/heart.png';
    this.explosion = new Image();
    this.explosion.src = './images/explosion.png';
    this.alien = new Alien(this.gameCtx,this.player.centerX, this.player.centerY);
    this.tokens = [];
    this.gameCtx = gameCtx;
    this.totalTokens = 0;
    this.background = new Background(0,0);
    this.backgroundCtx = backgroundCtx;
    this.start = this.start.bind(this);
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.printHeart = this.printHeart.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
    this.renderExplosion = this.renderExplosion.bind(this);
    this.restart = this.restart.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.playerLoosePoints = this.playerLoosePoints.bind(this);
    this.playerRecievePoints = this.playerRecievePoints.bind(this);
    this.createTokens(6);
    this.setEventListeners();
    this.difficulty = 2;
    this.aliens = [];
    // this.fps = 30;
    this.now;
    this.fps = 30;
    // this.catDate = Date.now();
    this.then = Date.now();
    // this.catInterval = 1000/this.fps;
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
        this.tokens.push( new Token(this.gameCtx, -5, 'death-token'));
        }

      } else {
        this.tokens.push( new Token(this.gameCtx, points*3, 'token'));
      }
    }
    this.difficulty += 2;
  }


  playerRecievePoints() {
    for (var i = 0; i < this.tokens.length; i++) {
        if((this.tokens[i].xCoord >= this.player.centerX && this.tokens[i].xCoord <= this.player.centerX + 50) &&
           (this.tokens[i].yCoord >= this.player.centerY && this.tokens[i].yCoord <= this.player.centerY + 50))
            {
          console.log('WEEE');
          console.log(`${this.tokens[i].points}`);
          this.player.points += this.tokens[i].points;
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);

          if(this.tokens[i].type === 'token') {
            this.printHeart();
            this.totalTokens += 1;
          }
        }
    }
  }

  playerLoosePoints() {
    for (var i = 0; i < this.alien.bullets.length; i++) {
      if(this.alien.bullets[i].xCoord >= this.player.centerX-20 && this.alien.bullets[i].xCoord <= this.player.centerX + 20 &&
        this.alien.bullets[i].yCoord >= this.player.centerY-20 && this.alien.bullets[i].yCoord  <= this.player.centerY + 20){
          this.player.points -= 5;
          console.log('WAHH');
      }
    }
  }

  renderExplosion() {
    for (let i = 0; i < 9; i++) {
      let width = 970/8;
      let heigth = 90;
      this.gameCtx.drawImage(this.explosion, i, width*i,
      this.explosion.naturalWidth/8, this.explosion.naturalHeight, this.player.centerX +10 , this.player.centerY-10,
      this.explosion.naturalWidth/8*2, this.explosion.naturalHeight*2);
    }
  }

  printHeart() {
    this.gameCtx.drawImage(this.heart,0,0,
    this.heart.naturalWidth, this.heart.naturalHeight, this.player.centerX + 20 , this.player.centerY -30,
    this.heart.naturalWidth, this.heart.naturalHeight);
  }

  renderTokens(gameCtx) {
      this.tokens.forEach( function(token) {
        token.xCoord -= 4;
        token.draw(gameCtx);
      });
  }

  createMoreTokens() {
    if(this.tokens.length < 6 ) {
      this.createTokens(5);
    }
  }

  gameOver(e) {
    if(this.player.points <= 0) {
      this.gameCtx.font = `55px sans-serif`;
      let gradient = this.gameCtx.createLinearGradient(0,0,this.gameCanvas.width,0);
      gradient.addColorStop("0","magenta");
      gradient.addColorStop("0.5","yellow");
      gradient.addColorStop("1.0","orange");
      this.gameCtx.fillStyle = gradient;
      this.gameCtx.clearRect(0,0,720,770);
      this.gameCtx.fillText('Game Over', 230, 310);
      this.gameCtx.font = `35px sans-serif`;
      this.gameCtx.fillText(`Total Tokens Collected: ${this.totalTokens}` ,168, 370);
      this.gameCtx.fillText('Press Space To Play Again', 160, 430);
    }
  }

  restart(e) {
    e.preventDefault();
    if(e.keyCode === 32) {
    this.player.points = 20;
    this.tokens = [];
    this.totalTokens = 0;
    this.createTokens(12);
    this.gameCtx.clearRect(0, 0, 690, 770);
    this.player.centerY = 550;
    this.player.centerX = 100;
    this.difficulty = 2;
    }
  }

  filterTokens() {
    this.tokens = this.tokens.filter((token) => token.xCoord > 4);
  }

  move(e) {
    e.preventDefault();
    if(e.code === 'ArrowDown') {
      this.player.moveDown(this.gameCtx);
      this.catSmoothMovement();
    } else if (e.code === 'ArrowUp') {
      this.player.moveUp(this.gameCtx);
      this.catSmoothMovement();
      // this.player.draw(this.gameCtx);
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
      this.catSmoothMovement();
      // this.player.draw(this.gameCtx);
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
      this.catSmoothMovement();
    }
    this.playerRecievePoints();
  }

  setEventListeners() {
    window.addEventListener('keydown', this.move);
    window.addEventListener('keydown', this.restart);
  }

  catSmoothMovement() {
      this.gameCtx.clearRect(0, 0, 720, 770);
      this.draw();
  }

  start(ctx) {
    requestAnimationFrame(this.start);
    let now = Date.now();
    this.delta = now - this.then;
    // this.catDelta = now - this.then
    this.alien.draw(this.gameCtx,this.player.centerX,this.player.centerY);
    if (this.delta > this.interval) {
        this.gameCtx.clearRect(0, 0, 720, 770);
        this.renderBackground(this.backgroundCtx);
        this.then = now - (this.delta % this.interval);
        this.draw(this.gameCtx);
      }
    this.createMoreTokens();
    this.gameOver();
    this.playerLoosePoints();
  }

  draw() {
    this.player.draw(this.gameCtx);
    this.renderTokens(this.gameCtx);
    this.playerRecievePoints();
    this.filterTokens();
    this.gameCtx.font = `40px sans-serif`;
    let gradient = this.gameCtx.createLinearGradient(0,0,this.gameCanvas.width,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","yellow");
    gradient.addColorStop("1.0","red");
    this.gameCtx.fillStyle = gradient;
    this.gameCtx.fillText(`Life points: ${this.player.points}   Tokens Collected: ${this.totalTokens}`, 20, 50);
  }


}

module.exports = Game;
