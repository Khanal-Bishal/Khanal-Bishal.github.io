/**
 * Particle class
 */
class Particle {
  constructor({ position, velocity, radius, color = "#654428" }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.radius = radius;
    this.duration = 50;
    this.color = color;
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
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    if (this.duration > 0) {
      this.duration--;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
