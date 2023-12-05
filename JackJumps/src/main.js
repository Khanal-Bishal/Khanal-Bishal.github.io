const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
  constructor(x, y, width, height) {
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 50;
    this.height = 50;
    this.velocity = {
      x: 0,
      y: 1,
    };
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  /**
   * Updates our player over time
   */
  update() {
    this.position.y += this.velocity.y;
    this.draw();
  }
}

const player = new Player();
player.draw();

/**
 * runs our game loop
 * @returns {}
 * @param {}
 *
 */
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height); //note we first need to clear canvas and then update it
  player.update();
}
animate();
