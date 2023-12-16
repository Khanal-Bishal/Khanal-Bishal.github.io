let health = 100;
let coinsCollected = 0;
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
  }

  draw() {
    ctx.font = "15px 'Press Start 2P', cursive";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fillText(
      `GOLD ${coinsCollected * 100}`,
      this.position.x,
      this.position.y
    );

    ctx.fillText(
      `HEALTH ${Math.ceil(health)}`,
      this.position.x,
      this.position.y + 40
    );
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
