let Token = require('./token.js');

class Bullet extends Token {
  constructor(ctx,points,type,xCoord,yCoord) {
    super(ctx,points,type);
    this.xCoord = xCoord;
    this.yCoord = yCoord;
    // debugger
  }

  draw(ctx,playerX,playerY) {
    // debugger
    ctx.fillColor = 'yellow';
    ctx.beginPath();
    ctx.arc(this.xCoord,this.yCoord,3,0,1.5*Math.PI);
    ctx.closePath();
    ctx.fill();
    let x = playerX < 550 ? playerX-550/6.5 : playerX ;
    debugger
    this.xCoord -= x;
    this.yCoord += 35;
    ctx.clearRect(this.xCoord,this.yCoord, 15, 15);
  }
}

module.exports = Bullet;
