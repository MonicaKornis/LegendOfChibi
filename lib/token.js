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
    this.xCoord = Math.floor(Math.random() * 650) + 100;
    this.yCoord = Math.floor(Math.random() * 620) + 15;
    this.tokenCoords = [];
  }

  draw(ctx) {
    debugger
  //   this.tokenSheet.onload = () => {
  //     ctx.drawImage(this.tokenSheet, this.points * this.width, 0,
  //     this.width, this.height, this.xCoord, this.yCoord,
  //     this.width/1.5, this.height/1.5);
  //   };
  // }
  if(this.tokenSheet.src) {
    }

    const animateCallback = () => {
    // debugger
      ctx.clearRect(this.xCoord, this.yCoord, this.width, this.height);
      ctx.drawImage(this.tokenSheet, this.points * this.width, 0,
        this.width, this.height, this.xCoord, this.yCoord,
        this.width/1.5, this.height/1.5);
    };


    window.requestAnimationFrame(animateCallback);

  }
}

module.exports = Token;
