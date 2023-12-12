let coins = [];
// let tempFrameVariable = 0;

class Coin {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: 0,
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
      125 * this.frames, //x-axis crop cords
      5, //y-axis crop cords
      125, // width for crop
      120, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    // tempFrameVariable++;
    // if (tempFrameVariable % 7 == 0) {
    this.frames += 1;
    // }

    if (this.frames >= 6) {
      this.frames = 0;
      // tempFrameVariable = 0;
    }
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

coinImg.onload = () => {
  initializeCoin();
};

/**
 * initialized instance of coin class and pushes it to coins array
 */
function initializeCoin() {
  coins = [
    new Coin({
      position: { x: 1010 + 10, y: 0 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 908 + lgPlatform.width - 200, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 908 + lgPlatform.width - 150, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 908 + lgPlatform.width - 100, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 908 + lgPlatform.width - 50, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 2572 + tPlatform.width / 2 - 100, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 2572 + tPlatform.width / 2 - 50, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 2950 + xtPlatform.width - 50, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 2950 + xtPlatform.width - 100, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 4940 + 150, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 4940 + 200, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 6351 + 50, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 6351 + 100, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
    new Coin({
      position: { x: 6351 + 150, y: 100 },
      velocity: { x: 0, y: 0 },
    }),
  ];
}
