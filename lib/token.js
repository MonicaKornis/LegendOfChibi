class Token {
  constructor(ctx,points,type){
    this.points = points;
    this.index = points === -5 ? 0 : points;
    this.ctx = ctx;
    this.tokenSheet = new Image();
    this.tokenSheet.onload = () => {

      this.tokenSheet.src = './images/potions2.png';
    };

    this.type = type;
    this.tokenSheet.src = './images/potions2.png';
    this.width = 272/6;
    this.height = 63;
    this.startX = 1;
    this.xCoord = Math.floor(Math.random() * 550) + 100;
    this.yCoord = Math.floor(Math.random() * 550) + 100;
  }

  draw(ctx) {
    if(this.tokenSheet.src) {
      ctx.drawImage(this.tokenSheet, this.index * this.width, 0,
      this.width, this.height, this.xCoord, this.yCoord,
      this.width/1.5, this.height/1.5);
    }
  }

}

module.exports = Token;
