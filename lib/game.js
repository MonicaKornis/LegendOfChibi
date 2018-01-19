let Player = require('./player.js');
let Background = require('./background.js');

class Game {
  constructor() {
    this.xDim = 12;
    this.yDim = 12;
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
    // let c = new Circle(this.xDim,this.yDim,10,'red');
    ctx.clearRect(0, 0, 630, 680);
    // c.draw(ctx);
    ctx.fillRect(125, 125, 125, 125);
    // debugger
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

module.exports = Game;
