/**
 * Player class
 */
class Player {
  constructor() {
    console.log("Player restart");
    this.position = {
      x: 100,
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

      flowerPower: {
        stand: {
          right: powerUpStandRight,
          left: powerUpStandLeft,
          cropWidth: 177,
          width: 66,
        },
        run: {
          right: powerUpRunRight,
          left: powerUpRunLeft,
          cropWidth: 340,
          width: 120,
        },
      },
    };

    this.powerUps = {
      flowerPower: false,
    };
    this.armour = false;
    this.opacity = 1;

    this.currentSprite = this.sprite.stand.right;
    this.cropWidth = this.sprite.stand.cropWidth;
    this.spriteImgWidth = this.sprite.stand.width;
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    // ctx.fillStyle = "rgba(255,255,255,0.3)";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.save();
    ctx.globalAlpha = this.opacity;
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
    ctx.restore();
  }

  /**
   * Updates our player over time
   */
  update() {
    tempFrameVariable++;
    // if (tempFrameVariable % 3 == 0) {
    this.frame += 1;
    // }
    if (
      this.frame > 55 &&
      (this.currentSprite == this.sprite.stand.right ||
        this.currentSprite == this.sprite.stand.left ||
        this.currentSprite == this.sprite.flowerPower.stand.left ||
        this.currentSprite == this.sprite.flowerPower.stand.right)
    ) {
      this.frame = 0;
      tempFrameVariable = 0;
    } else if (
      this.frame > 29 &&
      (this.currentSprite == this.sprite.run.right ||
        this.currentSprite == this.sprite.run.left ||
        this.currentSprite == this.sprite.flowerPower.run.left ||
        this.currentSprite == this.sprite.flowerPower.run.right)
    ) {
      this.frame = 0;
      tempFrameVariable = 0;
    }

    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (
      player.position.y + player.height + player.velocity.y <=
      canvas.height
    ) {
      this.velocity.y += GRAVITY;
    }
  }
}

let player = new Player();
