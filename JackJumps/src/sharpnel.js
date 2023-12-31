/**
 * Particle class
 */
class Sharpnel {
  constructor({ position, velocity, radius, color = "#00ffcc" }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: lastKeyPressed == "right" ? velocity.x : -velocity.x,
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
      0, //start angle
      Math.PI * 2 //end angle
    );
    ctx.fillStyle = this.color;
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
