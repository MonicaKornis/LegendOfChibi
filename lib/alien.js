let Bullet = require('./bullet.js');

class Alien {
  constructor(ctx,playerX,playerY) {
    this.alienSheet = new Image();
    this.bullets = [];
    this.alienSheet.src = './images/alien.png';
    this.width = 190/3;
    this.height = 64;
    this.frame = 0;
    this.draw = this.draw.bind(this);
    this.drawBullets = this.drawBullets.bind(this);
    this.removeBullets = this.removeBullets.bind(this);
    this.xCoord = 550;
    this.yCoord = 100;

    // this.xCoord = Math.floor(Math.random() * 620) + 100;
    // this.yCoord = Math.floor(Math.random() * 620) + 100;
    this.createBullet(ctx);
  }

  createBullet(ctx) {
    // debugger
    this.bullets.push( new Bullet(ctx,-5,'bullet',this.xCoord,this.yCoord));
  }

  drawBullets(ctx,playerX) {
    this.bullets.forEach((bullet) => {
      bullet.draw(ctx,playerX);
    });
  }

  removeBullets(ctx) {
    // debugger
    this.bullets.forEach((bullet) => {
      if(bullet.xCoord < 4) {
        // debugger
        this.bullets = this.bullets.filter((bullet) => bullet.xCoord > 4);
        this.createBullet(ctx);
      } else if(bullet.yCoord > 660) {
        this.bullets = this.bullets.filter((bullet) => bullet.yCoord < 660);
        this.createBullet(ctx);
      }
    });
  }

  draw(ctx,playerX,playerY) {
    ctx.clearRect(400,500, this.frameWidth, this.frameHeight);
      ctx.drawImage(this.alienSheet,this.width*this.frame,0,
      this.width, this.height, this.xCoord,this.yCoord,this.width, this.height);
      if(this.frame < 3) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }
      this.drawBullets(ctx,playerX,playerY);
      this.removeBullets(ctx);
    }


}

module.exports = Alien;
