class Background {
  contructor(posY, imageLength, speed) {

    this.speed = 10;
    this.y = posY;
    this.totalSeconds = 10;
    this.x = 0;
    this.imageLength = imageLength;
  }


  draw(ctx) {
    debugger
     this.image = new Image();
     this.image.src = './images/background.gif';
     ctx.drawImage(this.image, 0, 0);

    this.image.onLoad = () => {
      debugger
      let x = 0;
      let width = this.image.naturalWidth;
      let min = 0 - width;
      let count = 1;

      const loop = () => {
        ctx.drawImage(this.image, this.x, 0);
        ctx.drawImage(this.image, this.x + width * 2 ,0);
        ctx.drawImage(this.image, this.x + width * 3, 0);
        x -= count;
        if (x < min ) {
          x = 0;
        }
      };


      setInterval(loop,10);
    };

  }
}


module.exports = Background;
