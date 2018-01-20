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
