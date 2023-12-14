const jackCanvas = document.querySelector(".jackCanvas");
const ctx1 = jackCanvas.getContext("2d");
ctx1.width = 400;
ctx1.height = 300;
isJumping = false;

let tempFrame = 0;

/**
 * Player class
 */
class Jack {
  constructor() {
    this.position = {
      x: 50,
      y: 0,
    };

    this.width = 100;
    this.height = 150;
    this.image = spriteStandRight;

    this.frame = 0;

    this.currentSprite = spriteStandRight;
    this.cropWidth = 177;
    this.spriteImgWidth = 106;
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    ctx1.drawImage(
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
    tempFrame++;
    if (tempFrame % 3 == 0) {
      this.frame += 1;
    }
    if (this.frame > 55) {
      this.frame = 0;
      tempFrameVariable = 0;
    }

    this.draw();
  }
}

let jack = new Jack();

function animateJack() {
  ctx1.clearRect(0, 0, ctx1.width, ctx1.height);
  jack.update();
  requestAnimationFrame(animateJack);
}

animateJack();
