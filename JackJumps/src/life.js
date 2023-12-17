class Life {
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
    this.image = lifeImg;
    this.frames = 0;
  }
  draw() {
    ctx.drawImage(
      this.image, //image src
      108 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      108, // width for crop
      95, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;

    if (this.frames >= 7) {
      this.frames = 0;
    }
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

lifeImg.onload = () => {
  initializeLife();
};

/**
 * initalizes/positions health powerUp
 */
function initializeLife() {
  switch (currentLevel) {
    case 1:
      lifes = [
        new Life({
          position: { x: 3779 + mdPlatform.width - 100, y: 300 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    case 2:
      lifes = [
        new Life({
          position: { x: 4975 + mdPlatform.width - 100, y: 300 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    case 3:
      lifes = [
        new Life({
          position: { x: 10995 + tPlatform.width / 2, y: 300 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    default:
      break;
  }
}
