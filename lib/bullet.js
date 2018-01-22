let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord) {
    super(ctx,points,type);
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    debugger
  }

  draw(ctx) {
    debugger
    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,2,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    this.xCoord -= 20;
    this.yCoord +=2.5;
    ctx.clearRect(this.xCoord,this.yCoord, 15, 15);
    // this.yCoord += 1;
  }
}

module.exports = Bullet;
