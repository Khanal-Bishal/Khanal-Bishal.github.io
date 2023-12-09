let sharpnels = [];
/**
 * Particle class
 */
class Sharpnel {
  constructor({ position, velocity, radius }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: lastKeyPressed == "right" ? velocity.x : -velocity.x,
      y: velocity.y,
    };
    this.radius = radius;
    this.duration = 200;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    ctx.fillStyle = "#97bcff";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.duration--;
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
