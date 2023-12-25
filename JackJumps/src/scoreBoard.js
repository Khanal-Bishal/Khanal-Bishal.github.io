/**
 * Score board class
 */
class Score {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.width = 30;
    this.height = 30;
    this.frames = 0;
  }

  draw() {
    ctx.font = "15px 'Press Start 2P', cursive";
    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.drawImage(
      coinImg,
      125 * this.frames, //x-axis crop cords
      5, //y-axis crop cords
      125, // width for crop
      120, // height for crop
      this.position.x, // x cords
      this.position.y - 25, // y cords
      this.width,
      this.height
    );
    ctx.fillText(
      `\t  X ${Math.trunc(Math.ceil(coinsCollected * 100))}`,
      this.position.x,
      this.position.y
    );
  }
  update() {
    this.frames++;
    if (this.frames >= 6) {
      this.frames = 0;
    }
    this.draw();
  }
}

let score = new Score({
  position: {
    x: 50,
    y: 50,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
