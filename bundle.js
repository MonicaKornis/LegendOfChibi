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
    this.isGameOver = false;

    this.theme = document.getElementById("theme");
    this.muted = true;

    this.coin = document.getElementById('coin');
    this.meow = document.getElementById('meow');
    this.zap = document.getElementById('zap');


    this.alienDifficulty = 0;
    this.alien = new Alien(this.gameCtx,this.player.centerX, this.player.centerY, this.alienDifficulty);
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
    this.tokenAmmount = 6;
    this.createTokens(this.tokenAmmount);
    this.setEventListeners();
    this.difficulty = 2;
    this.raiseDifficulty = this.raiseDifficulty.bind(this);

    this.aliens = [];

    this.now;
    this.fps = 30;
    this.then = Date.now();
    this.interval = 3500/this.fps;
    this.delta;
  }
//
  renderBackground() {
    this.background.draw(this.backgroundCtx);
  }

  createTokens(num) {
    // if(!this.isGameOver) {
    for (let points = 0; points < num; points++) {
      if(points === 0) {

      for(let i = 0; i < this.difficulty ; i++) {
        this.tokens.push( new Token(this.gameCtx, -5, 'death-token'));
        }

      } else {
        this.tokens.push( new Token(this.gameCtx, points*2, 'token'));
      }
    }
    this.tokenAmmount -= 1;
    this.difficulty += 2;
    // }
  }


  playerRecievePoints() {
    for (var i = 0; i < this.tokens.length-1; i++) {
        if((this.tokens[i].xCoord >= this.player.centerX && this.tokens[i].xCoord <= this.player.centerX + 50) &&
           (this.tokens[i].yCoord >= this.player.centerY && this.tokens[i].yCoord <= this.player.centerY + 50))
            {
          console.log('WEEE');

          this.player.points += this.tokens[i].points;
          this.coin.play();
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);

          if(this.tokens[i].type === 'token') {
            if(!this.muted) this.coin.play();
            this.printHeart();
            this.totalTokens += 1;
          }
        }
    }
  }

  playerLoosePoints() {
    if(!this.isGameOver) {
    for (var i = 0; i < this.alien.bullets.length; i++) {
      if(this.alien.bullets[i].xCoord >= this.player.centerX-20 && this.alien.bullets[i].xCoord <= this.player.centerX + 20 &&
        this.alien.bullets[i].yCoord >= this.player.centerY-20 && this.alien.bullets[i].yCoord  <= this.player.centerY + 20){
          this.player.points -= 5;
          console.log('WAHH');
          if(!this.muted) this.zap.play();

      }
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

    if(this.tokens.length < 10 && !this.isGameOver) {
      this.createTokens(this.tokenAmmount);
    }
  }

  raiseDifficulty() {
    if(this.player.points > this.alienDifficulty * 20/1.5) {
      this.alien.difficulty += 1;
    }
  }

  gameOver(e) {
    if(this.player.points <= 0) {
      this.isGameOver = true;
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
      debugger
    this.playerRestart();
    this.tokens = [];
    // console.log(this.tokens);
    this.totalTokens = 0;
    this.tokenAmmount =6;
    this.createTokens(6);
    this.gameCtx.clearRect(0, 0, 690, 770);
    this.alien = new Alien(this.gameCtx,this.player.centerX, this.player.centerY, this.alienDifficulty);
    this.difficulty = 2;
    this.isGameOver = false;
    }
  }

  playerRestart() {
    this.player.points = 20;
    this.player.centerX = 100;
    this.player.centerY = 550;
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
    } else if (e.code === 'ArrowLeft') {
      this.player.moveBack(this.gameCtx);
      this.catSmoothMovement();
    } else if (e.code === 'ArrowRight') {
      this.player.moveFront(this.gameCtx);
      this.catSmoothMovement();
    }
    this.playerRecievePoints();
  }

  pause() {

  }


  setEventListeners() {
    window.addEventListener('keydown', this.move);
    window.addEventListener('keydown', this.restart);
    window.addEventListener('keydown', this.toggleSound);
    window.addEventListener('keydown', this.pause);
  }

  toggleSound(e) {
    if(e.keyCode === 77) {
      this.muted = !this.muted;
    }

    if(this.muted === false ) {
      this.theme.play();
      this.zap.play();
      this.zap.volume = 0.5;
      this.coin.volume = 0.5;
    } else {
      this.theme.pause();
      this.zap.pause();
    }
  }


  catSmoothMovement() {
      this.gameCtx.clearRect(0, 0, 720, 770);
      this.draw();
  }

  start(ctx) {
    requestAnimationFrame(this.start);
    let now = Date.now();
    this.delta = now - this.then;
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
    if(!this.isGameOver) {
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
    if (this.centerY < 560) {
    this.centerY += 25;
    }
  }

  moveUp(ctx) {
    if (this.centerY > 30) {
    this.centerY -= 25;
    }
  }

  moveBack(ctx) {
    if (this.centerX > 40) {
    this.centerX -= 25;
    }
  }

  moveFront(ctx) {
    if (this.centerX < 600) {
    this.centerX += 25;
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
    this.xCoord = Math.floor(Math.random() * 530) + 100;
    this.yCoord = Math.floor(Math.random() * 530) + 100;
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

  const start = new Start(document,gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  start.message();
  start.play();

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

    this.gameCtx.font = '20px Inconsolata';
    this.gameCtx.fillStyle = '#cce6ff';
    this.gameCtx.font = '28px Inconsolata';
    this.gameCtx.fillText('Use the up and down arrows to collect tokens.', 106, 405);
    this.gameCtx.fillText('Just make sure to watch out for the death orbs!', 107, 453);
    // this.gameCtx.fillText('Press M to toggle sound.', 147, 553);

    // this.gameCtx.fillText('Press M to toggle sound.', 217, 533);
    this.gameCtx.font = '33px Inconsolata';
    this.gameCtx.fillText('Press M to Toggle Sound and Space To Begin.', 70, 590);

  }


  play(playing) {
    this.document.addEventListener('keypress', (e) => {
      e.preventDefault();
      if (e.keyCode === 32 && !this.playing) {
        this.playing = true;
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
  constructor(ctx,playerX,playerY,difficulty) {
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
    this.xCoord = 590;
    this.yCoord = 100;
    this.difficulty = difficulty;
    // console.log(this.difficulty);
    this.createBullet(ctx,playerX,playerY,this.difficulty);

  }

  createBullet(ctx,playerX,playerY,difficulty) {
    this.bullets.push( new Bullet(ctx,-5,'bullet',this.xCoord,this.yCoord,playerX,playerY,this.difficulty));
  }

  drawBullets(ctx,playerX,playerY) {
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx,playerX,playerY);
    });
  }

  removeBullets(ctx) {
    //
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
      setTimeout(this.drawBullets(ctx,playerX,playerY), 100000);
      this.removeBullets(ctx);
    }


}

module.exports = Alien;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

let Token = __webpack_require__(2);

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY,difficulty) {
    super(ctx,points,type);
    this.ctx = ctx;
    this.xCoord = 595;
    this.yCoord = 127;
    this.offsets = [60,50,40,30,20,15];
    this.difficulty = difficulty;

    this.offXCord = 595;
    this.offyCoord = 127;
    this.decrementX = (this.xCoord - playerX) + this.offsets[this.difficulty] / 15;
    this.decrementY = (this.yCoord - playerY) + this.offsets[this.difficulty]/ 15;
  }

  draw(ctx,playerX,playerY) {

    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();

    this.xCoord -= this.decrementX;
    this.yCoord -= this.decrementY;

    if (this.xCoord > 680 || this.yCoord < 0) {
       this.xCoord = 595;
       this.yCoord = 127;
       this.decrementX = (this.xCoord - playerX)/15;
       this.decrementY = (this.yCoord - playerY)/15;
     }
    this.startOver(playerX,playerY);
  }

  startOver(playerX,playerY) {
    if(this.xCoord < playerX-10 || this.yCoord > playerY +80) {
      this.xCoord = 595;
      this.yCoord = 127;
      this.decrementX = (this.xCoord - playerX)/15;
      this.decrementY = (this.yCoord - playerY)/15;
    } else if (playerX === 595 && playerY === 127) {
      this.xCoord = 595;
      this.yCoord = 127;
    } else if (playerX > 595 && playerY < 127) {
      this.xCoord = 595;
      this.yCoord = 127;
    }
    console.log(this.difficulty);

  }
}

module.exports = Bullet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map