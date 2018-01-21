class Token {
  constructor(ctx,points,type){
    this.points = points;
    this.index = points === -5 ? 0 : points;
    this.ctx = ctx;
    this.tokenSheet = new Image();
    this.tokenSheet.onload = () => {

      this.tokenSheet.src = './images/potions.png';
    };

    this.type = type;
    this.tokenSheet.src = './images/potions.png';
    this.width = type == 'token' ? 255/5 : 51;
    this.height = type == 'token' ? 63 : 51;
    this.startX = 1;
    this.xCoord = Math.floor(Math.random() * 620) + 100;
    this.yCoord = Math.floor(Math.random() * 620) + 100;
    this.tokenCoords = [];
  }

  draw(ctx) {
    if(this.tokenSheet.src) {
      // ctx.fillStyle = 'green';
      // ctx.fillRect(this.xCoord, this.yCoord, this.width, this.height);
      ctx.drawImage(this.tokenSheet, this.index * this.width, 0,
      this.width, this.height, this.xCoord, this.yCoord,
      this.width/1.5, this.height/1.5);
    }
  }

}

module.exports = Token;
