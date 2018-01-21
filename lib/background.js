let Player = require('./player.js');

class Background {
  constructor() {
    this.x = 0;
  }


  draw(ctx) {
    this.image = new Image();

    this.image.onload = function() {
      // let x = 0;
      let width = this.image.naturalWidth;
      let min = 0 - width;
      let count = 3;

      const loop = () => {
        // debugger

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
