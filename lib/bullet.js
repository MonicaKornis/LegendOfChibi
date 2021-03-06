let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY,difficulty) {
    super(ctx,points,type);
    this.ctx = ctx;
    this.xCoord = 595;
    this.yCoord = 127;
    this.offsets = [60,50,40,30,20,15];
    this.difficulty = difficulty;

    this.offXCord = 595;
    this.offyCoord = 127;
    this.decrementX = (this.xCoord - playerX) + this.offsets[this.difficulty] / 15;
    this.decrementY = (this.yCoord - playerY) + this.offsets[this.difficulty]/ 15;
  }

  draw(ctx,playerX,playerY) {

    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();

    this.xCoord -= this.decrementX;
    this.yCoord -= this.decrementY;

    if (this.xCoord > 680 || this.yCoord < 0) {
       this.xCoord = 595;
       this.yCoord = 127;
       this.decrementX = (this.xCoord - playerX)/15;
       this.decrementY = (this.yCoord - playerY)/15;
     }
    this.startOver(playerX,playerY);
  }

  startOver(playerX,playerY) {
    if(this.xCoord < playerX-10 || this.yCoord > playerY +80) {
      this.xCoord = 595;
      this.yCoord = 127;
      this.decrementX = (this.xCoord - playerX)/15;
      this.decrementY = (this.yCoord - playerY)/15;
    } else if (playerX === 595 && playerY === 127) {
      this.xCoord = 595;
      this.yCoord = 127;
    } else if (playerX > 595 && playerY < 127) {
      this.xCoord = 595;
      this.yCoord = 127;
    }
    console.log(this.difficulty);

  }
}

module.exports = Bullet;
