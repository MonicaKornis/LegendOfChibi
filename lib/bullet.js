let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY) {
    super(ctx,points,type);
    this.xCoord = 570;
    this.yCoord = 127;
    this.decrementX = (this.xCoord - playerX)/16;
    this.decrementY = (this.yCoord - playerY)/16;
  }

  draw(ctx,playerX,playerY) {
    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();

    this.xCoord -= this.decrementX;
    this.yCoord -= this.decrementY;
    this.startOver(playerX,playerY);
    // console.log(`${this.xCoord}-${this.yCoord}`);
  }

  startOver(playerX,playerY) {
    // debugger
    if(this.xCoord < playerX-100) {
      this.xCoord = 580;
      this.yCoord = 127;
      this.decrementX = (this.xCoord - playerX)/16;
      this.decrementY = (this.yCoord - playerY)/16;
    } else if (this.yCoord > playerY+80) {
      this.xCoord = 580;
      this.yCoord = 127;
    }
  }
}

module.exports = Bullet;
