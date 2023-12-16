let flowers = [];
let frameSpeed = 0;

class Flower {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 55;
    this.height = 60;
    this.image = spriteFireFlower;
    this.frames = 0;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image, //image src
      56 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      56, // width for crop
      60, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    frameSpeed++;
    if (frameSpeed % 2 == 0) {
      this.frames++;
    }
    if (this.frames >= 75) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.velocity.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

checkImageLoaded(spriteFireFlower, () => {
  initializeFlower();
});

function initializeFlower() {
  switch (currentLevel) {
    case 1:
      flowers = [
        new Flower({
          position: { x: 1060 + 157, y: 150 - 60 },
          velocity: { x: 0, y: 0 },
        }),
        new Flower({
          position: { x: 200, y: 150 - 60 },
          velocity: { x: 0, y: 0 },
        }),
        new Flower({
          position: { x: 4385 + lgPlatform.width - 100, y: 150 - 60 },
          velocity: { x: 0, y: 0 },
        }),
        new Flower({
          position: { x: 6730 + tPlatform.width / 2 - 100, y: 150 - 60 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    case 2:
      flowers = [
        new Flower({
          position: { x: 300, y: 60 },
          velocity: { x: 0, y: 0 },
        }),

        new Flower({
          position: { x: 3468, y: 60 },
          velocity: { x: 0, y: 0 },
        }),

        new Flower({
          position: {
            x: 9864 + xtPlatform2.width / 2 - 30,
            y: 0,
          },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    case 3:
      flowers = [
        new Flower({
          position: { x: 300, y: 60 },
          velocity: { x: 0, y: 0 },
        }),
        new Flower({
          position: { x: 8957 + tPlatform.width - 80, y: 60 },
          velocity: { x: 0, y: 0 },
        }),
        new Flower({
          position: {
            x: 13189 + mdPlatform.width / 2 - 50,
            y: 0,
          },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    default:
      break;
  }
}
