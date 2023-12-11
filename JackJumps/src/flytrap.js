let flytrapImg = createImage("../img/hm.png");
let flytraps = [];
// let tempFrameVariable = 0;

class Flytrap {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: 0,
      y: velocity.y,
    };

    this.width = 100;
    this.height = 100;
    this.image = flytrapImg;
    this.frames = 0;
  }
  draw() {
    ctx.drawImage(
      this.image, //image src
      60 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      60, // width for crop
      120, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    tempFrameVariable++;
    if (tempFrameVariable % 13 == 0) {
      this.frames += 1;
    }

    if (this.frames >= 14) {
      this.frames = 0;
    }
    this.draw();
    // this.position.y += this.velocity.y;
    // if (this.position.y + this.height <= canvas.height) {
    //   this.velocity.y += GRAVITY;
    // }
  }
}
// return
flytrapImg.onload = () => {
  flytraps = [
    new Flytrap({
      position: { x: 500, y: 300 },
      velocity: { x: 0, y: 0 },
    }),
  ];
};
