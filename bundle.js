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
  gameCanvas.setAttribute('tabindex','0');
  let backgroundCanvas = document.getElementById('background-canvas');

  let backgroundCtx = backgroundCanvas.getContext('2d');
  let gameCtx = gameCanvas.getContext('2d');

  const game = new Game(gameCtx, backgroundCtx, gameCanvas, backgroundCanvas);
  game.start(gameCtx, backgroundCtx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(4);
let Background = __webpack_require__(3);
let Token = __webpack_require__(5);


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
      let c = new Player(110,110,10,'red',ctx);

      const loop = () => {
        // debugger
        ctx.drawImage(this.image, x, 0);
        ctx.drawImage(this.image, x + width * 1.001 ,0);
        ctx.drawImage(this.image, x + width * 1.002, 0);


        x -= count;
        if (x < min ) {
          x = 0;
        }
      };

      setInterval(loop,5);
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
    this.spriteSheet.src = './images/cat.png';
    this.points = 20;
    this.centerX = 100;
    this.centerY = 550;
    this.radius = 30;
    this.jumping = false;
    this.jumpCount = 0;
    this.frameWidth = 959/12;
    this.frameHeight = 73;
  }

  moveDown(ctx) {
    if (this.centerY < 650) {
    this.centerY += 20;
    this.draw(ctx);
    }
  }

  moveUp(ctx) {
    if (this.centerY > 0) {
    this.centerY -= 20;
    this.draw(ctx);
    }
  }

  moveBack(ctx) {
    if (this.centerX > 0 ) {
    this.centerX -= 20;
    this.draw(ctx);
    }
  }

  moveFront(ctx) {
    if (this.centerX < 680) {
    this.centerX += 20;
    this.draw(ctx);
    }
  }



  draw(ctx) {
    // debugger
    ctx.clearRect(this.centerX-14,this.centerY-13,this.frameWidth+26,this.frameHeight+25);
    ctx.drawImage(this.spriteSheet,0,0,
    this.frameWidth, this.frameHeight, this.centerX, this.centerY,
    this.frameWidth, this.frameHeight);


    // const animateCallback = () => {
    //   // debugger
    //     if (this.xDim < 200 && this.yDim < 200 ) {
    //     this.xDim += 1;
    //     this.yDim += 1;
    //     this.draw(ctx);
    //
    //   } else if (this.xDim >= 600 && this.yDim >= 600) {
    //     this.xDim = 1;
    //     this.yDim = 1;
    //     this.draw(ctx);
    //   }
    // };
    //
    //
    // window.requestAnimationFrame(animateCallback);
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
    this.tokenSheet.src = './images/foods.png';
    this.width = 500/8;
    this.height = 61;
    this.startX = 1;
    this.xCoord = Math.floor(Math.random() * 650) + 100;
    this.yCoord = Math.floor(Math.random() * 620) + 15;
  }

  draw(ctx) {
    debugger
    this.tokenSheet.onload = () => {
      console.log(this.points * this.width);
      ctx.drawImage(this.tokenSheet, this.points * this.width, 0,
      this.width, this.height, this.xCoord, this.yCoord,
      this.width/1.5, this.height/1.5);

    };
  }

}

module.exports = Token;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map