let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY) {
    super(ctx,points,type);
    this.xCoord = 595;
    this.yCoord = 127;
    this.decrementX = (this.xCoord - playerX)/15;
    this.decrementY = (this.yCoord - playerY)/15;
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
  }

  startOver(playerX,playerY) {
    if(this.xCoord < playerX-10 || this.yCoord > playerY +80) {
      this.xCoord = 595;
      this.yCoord = 127;
      this.decrementX = (this.xCoord - playerX)/15;
      this.decrementY = (this.yCoord - playerY)/15;
    }
  }
}

module.exports = Bullet;
