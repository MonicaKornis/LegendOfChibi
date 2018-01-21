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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);

document.addEventListener('DOMContentLoaded', () => {
  let gameCanvas = document.getElementById('game-canvas');
  let backgroundCanvas = document.getElementById('background-canvas');
  let backgroundCtx = backgroundCanvas.getContext('2d');
  let gameCtx = gameCanvas.getContext('2d');

  const game = new Game(gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  // debugger
  game.start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(4);
let Background = __webpack_require__(3);
let Token = __webpack_require__(5);
let Alien = __webpack_require__(7);

class Game {
  constructor(gameCtx,backgroundCtx,gameCanvas,backgroundCanvas) {
    this.player = new Player(12,12,2 * Math.PI,'red');
    this.alien = new Alien();
    this.tokens = [];
    this.gameCtx = gameCtx;
    this.backgroundCtx = backgroundCtx;
    this.start = this.start.bind(this);
    this.gameCanvas = gameCanvas;
    this.backgroundCanvas = backgroundCanvas;
    this.move = this.move.bind(this);
    this.draw = this.draw.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
    this.createTokens = this.createTokens.bind(this);
    this.playerRecievePoints = this.playerRecievePoints.bind(this);
    this.createTokens();
    this.setEventListeners();
    this.aliens = [];

  }
//
  renderBackground() {
    new Background(0,0).draw(this.backgroundCtx);
  }

  createTokens() {
    for (let i = 0; i < 8; i++) {
      this.tokens.push( new Token(this.gameCtx,i));
    }
  }

  playerRecievePoints() {

    for (var i = 0; i < this.tokens.length; i++) {
        if((this.tokens[i].xCoord >= this.player.centerX && this.tokens[i].xCoord  <= this.player.centerX + 40) &&
           (this.tokens[i].yCoord >= this.player.centerY && this.tokens[i].yCoord  <= this.player.centerY + 40)) {
          console.log('WEEE');
          this.player.points += this.tokens[i].points;
          this.tokens = this.tokens.filter((currentToken) => currentToken.yCoord != this.tokens[i].yCoord);
        }
    }

  }

  renderTokens(gameCtx) {
    // let x = 0;
    // let width = 680;
    // let min = 0 - width;
    // let count = 1;
    // const loop = () => {
      this.tokens.forEach( function(token) {
        token.xCoord -= 1;
        token.draw(gameCtx);
      });
    // };

      // setInterval(loop,1017);
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
    this.renderBackground(this.backgroundCtx);
    this.draw(this.gameCtx);
    this.renderTokens(this.gameCtx);
    this.alien.draw(this.gameCtx);
    requestAnimationFrame(this.start);
  }

  draw() {
    debugger
    this.gameCtx.clearRect(0,0,350,100);
    this.player.draw(this.gameCtx);
    this.playerRecievePoints();
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
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(4);

class Background {
  contructor() {
    this.x = 0;
  }


  draw(ctx) {
    this.image = new Image();

    this.image.onload = () => {
      let x = 0;
      let width = this.image.naturalWidth;
      let min = 0 - width;
      let count = 1;


      const loop = () => {
        // debugger
        ctx.drawImage(this.image, x, 0);
        ctx.drawImage(this.image, x + width * 1.001 ,0);
        ctx.drawImage(this.image, x + width * 1.002, 0);
        // ctx.drawImage(c,10,10,10,10);
        // ctx.fillRect(5, 555, 125, 125);
        // c.draw(ctx);

        x -= count;
        if (x < min ) {
          x = 0;
        }
      };

      setInterval(loop,17);
    };

    this.image.src = './images/background.gif';
  }
}


module.exports = Background;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Player {
  constructor(centerX, centerY, radius, color, ctx) {
    this.spriteSheet = new Image();

    // this.spriteSheet.onload = () => {
    //
    //   this.spriteSheet.src = './images/cat.png';
    // };

    this.spriteSheet.src = './images/cat.png';
    this.points = 20;
    this.centerX = 100;
    this.centerY = 550;
    this.frameWidth = 959/12;
    this.frameHeight = 73;
  }

  moveDown(ctx) {
    if (this.centerY < 650) {
    this.centerY += 20;
    }
  }

  moveUp(ctx) {
    if (this.centerY > 0) {
    this.centerY -= 20;
    }
  }

  moveBack(ctx) {
    if (this.centerX > 0 ) {
    this.centerX -= 20;
    }
  }

  moveFront(ctx) {
    if (this.centerX < 680) {
    this.centerX += 20;
    }
  }


  draw(ctx) {
    ctx.clearRect(this.centerX-14,this.centerY-10,this.frameWidth+22,this.frameHeight+22);
    ctx.drawImage(this.spriteSheet,0,0,
    this.frameWidth, this.frameHeight, this.centerX, this.centerY,
    this.frameWidth, this.frameHeight);
  }


}

module.exports = Player;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Token {
  constructor(ctx,points){
    this.points = points;
    this.ctx = ctx;
    this.tokenSheet = new Image();
    this.tokenSheet.onload = () => {

      this.tokenSheet.src = './images/foods.png';
    };

    this.tokenSheet.src = './images/foods.png';
    this.width = 500/8;
    this.height = 61;
    this.startX = 1;
    this.xCoord = Math.floor(Math.random() * 620) + 100;
    this.yCoord = Math.floor(Math.random() * 620) + 100;
    this.tokenCoords = [];
  }

  draw(ctx) {
    if(this.tokenSheet.src) {
      ctx.clearRect(this.xCoord, this.yCoord, this.width, this.height);
      ctx.drawImage(this.tokenSheet, this.points * this.width, 0,
      this.width, this.height, this.xCoord, this.yCoord,
      this.width/1.5, this.height/1.5);
    }
  }

}

module.exports = Token;


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

class Alien {
  constructor() {
    this.alienSheet = new Image();
    this.alienSheet.src = './images/alien.png';
    // this.alienSheet.onload = () => {
    //
    //   this.alienSheet.src = './images/alien.png';
    // };
    this.width = 190/3;
    this.height = 64;
    this.frame = 0;
    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    // debugger
      ctx.clearRect(400,500, this.frameWidth, this.frameHeight);
      ctx.drawImage(this.alienSheet,this.width*this.frame,0,
      this.width, this.height, 400,500,this.width, this.height);
      if(this.frame > 3) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }
    }
}

module.exports = Alien;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map