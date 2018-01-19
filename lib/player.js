class Player {
  constructor(centerX, centerY, radius, color) {
    this.points = 20;
    this.centerX = 10;
    this.centerY = 10;
    // this.radius = 10;
  }

  // randomCircle(maxX, maxY, numCircles) {
  //   return new Circle(
  //     maxX * Math.random(),
  //     maxY * Math.random(),
  //     Circle.radius(maxX, maxY, numCircles),
  //     this.randomColor()
  //   );
  // }

  radius(maxX, maxY, numCircles) {
    let targetCircleArea = (maxX * maxY) / numCircles;
    let targetRadius = Math.sqrt(targetCircleArea/ Math.PI);
    return 2 * targetRadius;
  }

  // randomColor() {
  //   const hex = "0123456789ABCDEF";
  //   let color = "#";
  //   for (let i = 0; i < 6; i++) {
  //     color += hex[Math.floor((Math.random() * 16))];
  //   }
  //   return color;
  // }

  moveRandom(maxX, maxY) {
    let dy = (Math.random() * 2) - 1;
    let dx = (Math.random() * 2) - 1;

    this.centerX = Math.abs((this.centerX + (dx * this.radius * .1)) % maxX);
    this.centerY = Math.abs((this.centerY + (dx * this.radius * .1)) % maxY);
  }

  draw(ctx) {
    ctx.fillStyle = 'orange';
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
}

module.exports = Player;
