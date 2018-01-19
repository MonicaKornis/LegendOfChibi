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

  const game = new Game(gameCtx, backgroundCtx);
  game.start(gameCtx, backgroundCtx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Player = __webpack_require__(4);
let Background = __webpack_require__(3);

class Game {
  constructor(gameCtx,backgroundCtx) {
    this.backgroundCtx = backgroundCtx;
    this.gameCtx = gameCtx;
    this.xDim = 12;
    this.yDim = 12;
  }

  renderBackground(ctx) {
    new Background(0,0).draw(ctx);
  }


  start(gameCtx,backgroundCtx) {
    this.renderBackground(backgroundCtx);
    this.draw(gameCtx);
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    let c = new Player(this.xDim,this.yDim,2 * Math.PI,'red');
    ctx.clearRect(125, 125, 125, 125);
    c.draw(ctx);
    ctx.fillRect(125, 125, 125, 125);
    // debugger
    const animateCallback = () => {
      // debugger
        if (this.xDim < 200 && this.yDim < 200 ) {
        this.xDim += 1;
        this.yDim += 1;
        this.draw(ctx);

      } else if (this.xDim >= 600 && this.yDim >= 600) {
        this.xDim = 1;
        this.yDim = 1;
        this.draw(ctx);
      }
    };


    window.requestAnimationFrame(animateCallback);
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
      let c = new Player(110,110,10,'red');

      const loop = () => {
        // debugger
        ctx.drawImage(this.image, x, 0);
        ctx.drawImage(this.image, x + width * 1.001 ,0);
        ctx.drawImage(this.image, x + width * 1.002, 0);
        // ctx.drawImage(c,10,10,10,10);
        ctx.fillRect(5, 555, 125, 125);
        // c.draw(ctx);

        x -= count;
        if (x < min ) {
          x = 0;
        }
      };

      setInterval(loop,15);
    };

    this.image.src = './images/background.gif';
  }
}


module.exports = Background;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Player {
  constructor(centerX, centerY, radius, color) {
    this.points = 20;
    this.centerX = 10;
    this.centerY = 10;
    // this.radius = 10;
  }

  // randomCircle(maxX, maxY, numCircles) {
  //   return new Circle(
  //     maxX * Math.random(),
  //     maxY * Math.random(),
  //     Circle.radius(maxX, maxY, numCircles),
  //     this.randomColor()
  //   );
  // }

  radius(maxX, maxY, numCircles) {
    let targetCircleArea = (maxX * maxY) / numCircles;
    let targetRadius = Math.sqrt(targetCircleArea/ Math.PI);
    return 2 * targetRadius;
  }



  moveRandom(maxX, maxY) {
    let dy = (Math.random() * 2) - 1;
    let dx = (Math.random() * 2) - 1;

    this.centerX = Math.abs((this.centerX + (dx * this.radius * .1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dx * this.radius * .1)) % maxY);
  }

  draw(ctx) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map