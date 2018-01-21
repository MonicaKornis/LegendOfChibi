let Player = require('./player.js');

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
