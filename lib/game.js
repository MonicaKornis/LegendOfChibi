let Circle = require('./circle.js');
let Background = require('./background.js');

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
    // b.width = 25;
    // b.height = 25;
    // debugger
    // ctx.drawImage(b, 0, 0, 600, 525);
    ctx.fillRect(25, 25, 25, 25);

    // b.draw(ctx);
    c.draw(ctx);

    // debugger

    const animateCallback = () => {
      debugger
      ctx.clearRect(0, 0, 620, 550);
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

  moveCircle(c) {
    c.moveRandom(this.xDim , this.yDim);
  }

}

module.exports = Game;
