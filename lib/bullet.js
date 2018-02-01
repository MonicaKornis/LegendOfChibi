let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord,playerX,playerY) {
    super(ctx,points,type);
    this.ctx = ctx;
    this.xCoord = 595;
    this.yCoord = 127;

    this.offXCord = 595;
    this.offyCoord = 127;

    this.decrementX = (this.xCoord - playerX)/15;
    this.decrementY = (this.yCoord - playerY)/15;

    this.offCenterX = (this.xCoord - playerX+.2)/15;
    this.offCenterY = (this.yCoord - playerY+.2)/15;
    this.offCenter = this.offCenter.bind(this);
  }

  offCenter(ctx) {
    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();

    this.offXCord -= this.offCenterX;
    this.offyCoord -= this.offCenterY;
  }

  offCenterStartOver(playerX,playerY) {
    if(this.offCenterX < playerX-10 || this.offCenterY > playerY +80) {
      this.offCenterX = 595;
      this.offCenterY = 127;
      this.decrementX = (this.offCenterX - playerX)/15;
      this.decrementY = (this.offCenterY - playerY)/15;
    }
  }

  draw(ctx,playerX,playerY) {
    this.offCenter(ctx);
    this.offCenterStartOver(playerX,playerY);
    console.log(`${this.xCoord} x ${this.yCoord} y`);
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

  }
}

module.exports = Bullet;
