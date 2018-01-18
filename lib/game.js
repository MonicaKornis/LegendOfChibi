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
