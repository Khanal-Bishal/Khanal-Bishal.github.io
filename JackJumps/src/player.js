let spriteStandLeft = createImage("../img/spriteStandLeft.png");
let spriteStandRight = createImage("../img/spriteStandRight.png");
let spriteRunLeft = createImage("../img/spriteRunLeft.png");
let spriteRunRight = createImage("../img/spriteRunRight.png");
let tempFrameVariable = 0;

let playerCurrentPosition = 0;
/**
 * Player class
 */
class Player {
  constructor() {
    this.position = {
      x: 50,
      y: 50,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.width = 66;
    this.height = 100;
    this.image = spriteStandRight;

    this.frame = 0;
    this.sprite = {
      stand: {
        right: spriteStandRight,
        left: spriteStandLeft,
        cropWidth: 177,
        width: 66,
      },
      run: {
        right: spriteRunRight,
        left: spriteRunLeft,
        cropWidth: 340,
        width: 120,
      },
    };
    this.currentSprite = this.sprite.stand.right;
    this.cropWidth = this.sprite.stand.cropWidth;
    this.spriteImgWidth = this.sprite.stand.width;
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(
      this.currentSprite,
      this.cropWidth * this.frame, //x cord-cropping origin
      0, //y cord-cropping origin
      this.cropWidth, //width for crop
      400, //height for crop
      this.position.x,
      this.position.y,
      this.spriteImgWidth,
      this.height
    );
  }

  /**
   * Updates our player over time
   */
  update() {
    tempFrameVariable++;
    if (tempFrameVariable % 3 == 0) {
      this.frame += 1;
    }

    if (
      this.frame > 55 &&
      (this.currentSprite == this.sprite.stand.right ||
        this.currentSprite == this.sprite.stand.left)
    ) {
      this.frame = 0;
    } else if (
      this.frame > 29 &&
      (this.currentSprite == this.sprite.run.right ||
        this.currentSprite == this.sprite.run.left)
    ) {
      this.frame = 0;
    }

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
    if (
      player.position.y + player.height + player.velocity.y <=
      canvas.height
    ) {
      this.velocity.y += GRAVITY;
    }
    // this.velocity.y += GRAVITY;
  }
}

let player = new Player();
player.draw();
