let particles = [];
/**
 * Particle class
 */
class Particle {
  constructor({ position, velocity, radius }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
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
    ctx.fillStyle = "#654428";
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