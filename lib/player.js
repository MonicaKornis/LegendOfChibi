let Game = require('./game.js');

class Player {
  constructor(centerX, centerY, radius, color, ctx) {
    this.spriteSheet = new Image();
    this.spriteSheet.src = './images/cat.png';
    this.points = 20;
    this.centerX = 100;
    this.centerY = 550;
    this.frameWidth = 959/12;
    this.frameHeight = 73;
  }

  moveDown(ctx) {
    if (this.centerY < 560) {
    this.centerY += 35;
    }
  }

  moveUp(ctx) {
    if (this.centerY > 30) {
    this.centerY -= 35;
    }
  }

  moveBack(ctx) {
    if (this.centerX > 40) {
    this.centerX -= 35;
    }
    console.log(this.centerX);
  }

  moveFront(ctx) {
    if (this.centerX < 600) {
    this.centerX += 35;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.spriteSheet,0,0,
    this.frameWidth, this.frameHeight, this.centerX, this.centerY,
    this.frameWidth, this.frameHeight);
  }


}

module.exports = Player;
