let playerCurrentPosition = 0;
/**
 * Player class
 */
class Player {
  constructor(x, y, width, height) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  a;
  /**
   * Updates our player over time
   */
  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    //setting gravity to our player
    // if (
    //   player.position.y + player.height + player.velocity.y >=
    //   canvas.height
    // ) {
    //   this.velocity.y += GRAVITY;
    // } else {
    //   this.velocity.y += GRAVITY;
    // }
    this.velocity.y += GRAVITY;
  }
}

let player = new Player(50, 50, 50, 50);
player.draw();
