/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(1);
let Background = __webpack_require__(4);
let Token = __webpack_require__(2);
let Alien = __webpack_require__(5);

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
    this.createTokens(12);
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
        this.tokens.push( new Token(this.gameCtx, -5, 'death-token'));
        }

      } else {
        this.tokens.push( new Token(this.gameCtx, points, 'token'));
      }
    }
    this.difficulty += 3;
  }


  playerRecievePoints() {
    for (var i = 0; i < this.tokens.length; i++) {
        if((this.tokens[i].xCoord-10 >= this.player.centerX && this.tokens[i].xCoord <= this.player.centerX + 40) &&
           (this.tokens[i].yCoord-10 >= this.player.centerY && this.tokens[i].yCoord <= this.player.centerY + 40))
            {
              debugger
          console.log('WEEE');
          console.log(`${this.tokens[i].points}`);
          this.player.points += this.tokens[i].points;
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);

          if(this.tokens[i].type === 'token') {
            this.printHeart();
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
          this.renderExplosion();

      }
    }
  }

  renderExplosion() {
    for (let i = 0; i < 9; i++) {
      let width = 970/8;
      let heigth = 90;
      this.gameCtx.drawImage(this.explosion, i, width*i,
      this.explosion.naturalWidth/8, this.explosion.naturalHeight, this.explosion.centerX + 20 , this.player.centerY -30,
      this.explosion.naturalWidth/8, this.explosion.naturalHeight);
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
    if(this.tokens.length < 4 ) {
      this.createTokens(5);
    }
  }

  gameOver(e) {
    // debugger
    if(this.player.points <= 0) {
      this.gameCtx.font = `55px sans-serif`;
      let gradient = this.gameCtx.createLinearGradient(0,0,this.gameCanvas.width,0);
      gradient.addColorStop("0","magenta");
      gradient.addColorStop("0.5","yellow");
      gradient.addColorStop("1.0","orange");
      this.gameCtx.fillStyle = gradient;
      this.gameCtx.clearRect(0,0,680,650);
      this.gameCtx.fillText('Game Over', 212, 310);
      this.gameCtx.font = `35px sans-serif`;
      this.gameCtx.fillText('Press Arrows To Play Again', 144, 370);
    }
  }

  restart(e) {
    e.preventDefault();
    if(e.keyCode === 32) {
    this.player.points = 20;
    this.tokens = [];
    this.createTokens(12);
    this.gameCtx.clearRect(0,0,680,650);
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
    } else if (e.code === 'ArrowUp') {
      this.player.moveUp(this.gameCtx);
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
    }
    this.playerRecievePoints();
    // this.playerLoosePoints();
  }

  setEventListeners() {
    window.addEventListener('keydown', this.move);
    window.addEventListener('keydown', this.restart);
  }

  start(ctx) {
    requestAnimationFrame(this.start);
    let now = Date.now();
    this.delta = now - this.then;
    this.alien.draw(this.gameCtx,this.player.centerX,this.player.centerY);
    if (this.delta > this.interval) {
      this.gameCtx.clearRect(0,0,680,650);
        this.renderBackground(this.backgroundCtx);
        this.draw(this.gameCtx);
        this.renderTokens(this.gameCtx);
        this.then = now - (this.delta % this.interval);
      }
    this.createMoreTokens();
    this.gameOver();
    this.playerLoosePoints()
  }

  draw() {
    this.player.draw(this.gameCtx);
    this.playerRecievePoints();
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Game = __webpack_require__(0);

class Player {
  constructor(centerX, centerY, radius, color, ctx) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = './images/cat.png';
    this.points = 20;
    this.centerX = 100;
    this.centerY = 550;
    this.frameWidth = 959/12;
    this.frameHeight = 73;
  }

  moveDown(ctx) {
    if (this.centerY < 550) {
    this.centerY += 35;
    }
  }

  moveUp(ctx) {
    if (this.centerY > 10) {
    this.centerY -= 35;
    }
  }

  moveBack(ctx) {
    if (this.centerX > 10 ) {
    this.centerX -= 35;
    }
    console.log(this.centerX);
  }

  moveFront(ctx) {
    if (this.centerX < 650) {
    this.centerX += 35;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.spriteSheet,0,0,
    this.frameWidth, this.frameHeight, this.centerX, this.centerY,
    this.frameWidth, this.frameHeight);
  }


}

module.exports = Player;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Token {
  constructor(ctx,points,type){
    this.points = points;
    this.index = points === -5 ? 0 : points;
    this.ctx = ctx;
    this.tokenSheet = new Image();
    this.tokenSheet.onload = () => {

      this.tokenSheet.src = './images/potions2.png';
    };

    this.type = type;
    this.tokenSheet.src = './images/potions2.png';
    this.width = 272/6;
    this.height = 63;
    this.startX = 1;
    this.xCoord = Math.floor(Math.random() * 550) + 100;
    this.yCoord = Math.floor(Math.random() * 550) + 100;
  }

  draw(ctx) {
    if(this.tokenSheet.src) {
      ctx.drawImage(this.tokenSheet, this.index * this.width, 0,
      this.width, this.height, this.xCoord, this.yCoord,
      this.width/1.5, this.height/1.5);
    }
  }

}

module.exports = Token;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

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
    // this.img = img;
  }

  message() {
    this.gameCtx.clearRect(0, 0, 630, 680);
    this.gameCtx.fillStyle = "#3366ff";
    this.gameCtx.fillRect(0, 0, 630, 680);
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '50px Inconsolata';
    this.gameCtx.fillText('The Legend of Chibi', 105, 80);

    this.gameCtx.font = '25px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.fillText('You are a cat named Chibi Mochi trying to collect magic', 30, 200);
    this.gameCtx.fillText('potions in the Egyptian desert. However, you must watch', 33, 240);
    this.gameCtx.fillText('out for the malicious aliens who will try to steal your life',36, 280);
    this.gameCtx.fillText('points!! The game ends when you are out of life points.',37, 320);
    // this.gameCtx.drawImage(this.img, 270,270,this.img.naturalWidth, this.img.naturalHeight);
    this.gameCtx.font = '20px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '28px Inconsolata';
    this.gameCtx.fillText('Use the up and down arrows to collect tokens.', 51, 405);
    this.gameCtx.fillText('Just make sure to watch out for the death orbs!', 52, 453);

    this.gameCtx.font = '35px Inconsolata';
    this.gameCtx.fillText('Press Space To Begin', 163, 590);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(1);

class Background {
  constructor() {
    this.x = 0;
  }

  draw(ctx) {
    this.image = new Image();
    this.image.onload = function() {
      let width = this.image.naturalWidth;
      let min = 0 - width;
      let count = 7;

      const loop = () => {
        ctx.drawImage(this.image, this.x, 0);
        ctx.drawImage(this.image, this.x + width * 1.001 ,0);
        ctx.drawImage(this.image, this.x + width * 1.002, 0);

        this.x -= count;
        if (this.x < min ) {
          this.x = 0;
        }
      };

      this.interval = this.interval || setInterval(loop.bind(this),17);
    }.bind(this);

    this.image.src = './images/background.gif';
  }
}


module.exports = Background;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

let Bullet = __webpack_require__(6);

class Alien {
  constructor(ctx,playerX,playerY) {
    this.alienSheet = new Image();
    this.bullets = [];
    this.alienSheet.src = './images/alien.png';
    this.width = 190/3;
    this.height = 64;
    this.frame = 0;
    this.createBullet = this.createBullet.bind(this);
    this.draw = this.draw.bind(this);
    this.drawBullets = this.drawBullets.bind(this);
    this.removeBullets = this.removeBullets.bind(this);
    this.xCoord = 570;
    this.yCoord = 100;
    this.createBullet(ctx,playerX,playerY);
  }

  createBullet(ctx,playerX,playerY) {
    this.bullets.push( new Bullet(ctx,-5,'bullet',this.xCoord,this.yCoord,playerX,playerY));
  }

  drawBullets(ctx,playerX,playerY) {
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx,playerX,playerY);
    });
  }

  removeBullets(ctx) {
    // debugger
    this.bullets.forEach((bullet) => {
      if(bullet.xCoord < 4) {
        this.bullets = this.bullets.filter((bullet) => bullet.xCoord > 4);
        this.createBullet(ctx);
      } else if(bullet.yCoord > 660) {
        this.bullets = this.bullets.filter((bullet) => bullet.yCoord < 660);
        this.createBullet(ctx);

      }
    });
  }

  draw(ctx,playerX,playerY) {
    ctx.clearRect(400,500, this.frameWidth, this.frameHeight);
      ctx.drawImage(this.alienSheet,this.width*this.frame,0,
      this.width, this.height, this.xCoord,this.yCoord,this.width, this.height);
      if(this.frame < 3) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }
      this.drawBullets(ctx,playerX,playerY);
      this.removeBullets(ctx);
      // console.log(`${this.xCoord,this.yCoord}`);
    }


}

module.exports = Alien;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

let Token = __webpack_require__(2);

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY) {
    super(ctx,points,type);
    this.xCoord = 570;
    this.yCoord = 127;
    this.decrementX = (this.xCoord - playerX)/16;
    this.decrementY = (this.yCoord - playerY)/16;
  }

  draw(ctx,playerX,playerY) {
    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();

    this.xCoord -= this.decrementX;
    this.yCoord -= this.decrementY;
    this.startOver(playerX,playerY);
  }

  startOver(playerX,playerY) {
    if(this.xCoord < playerX-100) {
      this.xCoord = 580;
      this.yCoord = 127;
      this.decrementX = (this.xCoord - playerX)/16;
      this.decrementY = (this.yCoord - playerY)/16;
    } else if (this.yCoord > playerY+80) {
      this.xCoord = 580;
      this.yCoord = 127;
    }
  }
}

module.exports = Bullet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map