class Alien {
  constructor() {
    this.alienSheet = new Image();
    this.alienSheet.src = './images/alien.png';
    this.width = 190/3;
    this.height = 64;
    this.frame = 0;
    this.draw = this.draw.bind(this);
    this.xcoord = Math.floor(Math.random() * 620) + 100;
    this.yCoord = Math.floor(Math.random() * 620) + 100;
  }

  draw(ctx) {
      ctx.clearRect(400,500, this.frameWidth, this.frameHeight);
      ctx.drawImage(this.alienSheet,this.width*this.frame,0,
      this.width, this.height, 400,500,this.width, this.height);
      if(this.frame < 3) {
        this.frame += 1;
      } else {
        this.frame = 0;
      }
    }
}

module.exports = Alien;
