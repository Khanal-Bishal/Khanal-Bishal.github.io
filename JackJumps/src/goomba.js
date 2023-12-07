let spriteGoomba = createImage("../img/spriteGoomba.png");
let goombas = [];

class Goomba {
  constructor({ position, velocity }) {
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
    this.image = spriteGoomba;
    this.frames = 0;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image, //image src
      130 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      130, // width for crop
      150, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames >= 58) {
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

goombas = [
  new Goomba({ position: { x: 800, y: 100 }, velocity: { x: -0.1, y: 0 } }),
];
