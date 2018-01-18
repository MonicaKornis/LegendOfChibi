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

  let ctx = gameCanvas.getContext('2d');
  const game = new Game();
  game.start(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

let Circle = __webpack_require__(2);
let Background = __webpack_require__(3);

class Game {
  constructor(xDim, yDim) {
    this.xDim = xDim;
    this.yDim = yDim;
  }

  renderBackground(ctx) {
    new Background(0,0).draw(ctx);
  }


  start(ctx) {
    this.renderBackground(ctx);
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillStyle = "red";
    let c = new Circle(this.xDim,this.yDim,10,'blue');


    ctx.fillRect(125, 125, 125, 125);
    c.draw(ctx);

    // debugger
    ctx.clearRect(0, 0, 630, 680);

    const animateCallback = () => {
      this.renderBackground();
        if (this.xDim < 200 && this.yDim < 200 ) {
        this.xDim += 1;
        this.yDim += 1;
        this.draw(ctx);

      } else if (this.xDim >= 200 && this.yDim >= 200) {
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
/* 2 */
/***/ (function(module, exports) {

class Circle {
  constructor(centerX, centerY, radius, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
  }

  randomCircle(maxX, maxY, numCircles) {
    return new Circle(
      maxX * Math.random(),
      maxY * Math.random(),
      Circle.radius(maxX, maxY, numCircles),
      this.randomColor()
    );
  }

  radius(maxX, maxY, numCircles) {
    let targetCircleArea = (maxX * maxY) / numCircles;
    let targetRadius = Math.sqrt(targetCircleArea/ Math.PI);
    return 2 * targetRadius;
  }

  randomColor() {
    const hex = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor((Math.random() * 16))];
    }
    return color;
  }

  moveRandom(maxX, maxY) {
    let dy = (Math.random() * 2) - 1;
    let dx = (Math.random() * 2) - 1;

    this.centerX = Math.abs((this.centerX + (dx * this.radius * .1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dx * this.radius * .1)) % maxY);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
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

module.exports = Circle;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

class Background {
  contructor(posY, imageLength, speed) {
    this.x = 0;
  }


  draw(ctx) {
    this.image = new Image();
    let context = ctx;

    this.image.onload = () => {
      let x = 0;
      let width = this.image.naturalWidth;
      let min = 0 - width;
      let count = 1;

      const loop = () => {
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map