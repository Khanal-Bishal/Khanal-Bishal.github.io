let coinImg = createImage("../img/coinImg.png");
let coins = [];
// let tempFrameVariable = 0;

class Coin {
  constructor({ position, velocity, distance }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 45;
    this.height = 50;
    this.image = coinImg;
    this.frames = 0;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image, //image src
      124.6 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      124.6, // width for crop
      135, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    tempFrameVariable++;
    if (tempFrameVariable % 15 == 0) {
      this.frames += 1;
    }

    if (this.frames >= 6) {
      this.frames = 1;
    }
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

coinImg.onload = () => {
  coins = [
    new Coin({
      position: { x: 800, y: 100 },
      velocity: { x: Math.random() * -0.3, y: 0 },
      distance: { limit: Math.random() * 400, coveredDistance: 0 },
    }),
  ];
};
