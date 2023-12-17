/**
 * Player class
 */
class MainBoss {
  constructor({ position }) {
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.scale = 0.1;
    this.width = 156;
    this.height = 120;
    this.image = mainBossStandImg;

    this.frame = 0;
    this.sprite = {
      stand: {
        left: mainBossStandImg,
        cropWidth: 398,
        width: 353,
      },
      hit: {
        left: mainBossHitImg,
        cropWidth: 398,
        width: 353,
      },
      run: {
        right: mainBossRunRightImg,
        cropWidth: 398,
        width: 353,
      },
    };
    if (mainBossHealth >= 0 || currentLevel > 1) {
      this.currentSprite = this.sprite.stand.left;
      this.cropWidth = this.sprite.stand.cropWidth;
      this.spriteImgWidth = this.sprite.stand.width;
    }
    console.log(this.currentSprite);
  }

  /**
   * draw our charecter into the screen
   */
  draw() {
    ctx.drawImage(
      this.currentSprite,
      this.cropWidth * this.frame, //x cord-cropping origin
      0, //y cord-cropping origin
      this.cropWidth, //width for crop
      353, //height for crop
      this.position.x,
      this.position.y,
      this.width,
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

    if (this.frame > 55 && this.currentSprite == this.sprite.stand.left) {
      this.frame = 0;
      tempFrameVariable = 0;
    }
    if (this.frame > 0 && this.currentSprite == this.sprite.hit.left) {
      this.frame = 0;
      tempFrameVariable = 0;
    }
    if (this.frame > 40 && this.currentSprite == this.sprite.run.right) {
      this.frame = 0;
      tempFrameVariable = 0;
    }

    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (!(mainBossHealth <= 0)) {
      shootFireBall();
    }

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

// checkTwoImagesLoaded(mainBossHitImg, mainBossStandImg, () => {
initializeMainBoss();
// });

function initializeMainBoss() {
  switch (currentLevel) {
    case 1:
      console.log("from mainboss 1 ");
      mainBoss = new MainBoss({
        // position: { x: 1200 - 200, y: 300 },
        position: { x: 8753 + lgPlatform.width - 200, y: 300 },
      });

      break;
    case 2:
      console.log("from mainboss 2 ");

      mainBoss = new MainBoss({
        position: { x: 11594, y: 300 },
      });
      break;
    case 3:
      console.log("from mainboss 3 ");

      mainBoss = new MainBoss({
        position: { x: 14099 + 100, y: 300 },
      });
      break;
  }
}
let tempVariable = 0;

/**
 * Shoots fire ball and changes sprite animation for shots fired
 */
function shootFireBall() {
  if (mainBossHealth > 0) {
    tempVariable++;
    if (tempVariable % 113 == 0 && mainBossHealth >= 0) {
      fireballs.push(
        new FireBall({
          position: {
            x: mainBoss.position.x + mainBoss.width / 2,
            y: mainBoss.position.y + mainBoss.height / 2,
          },
          velocity: {
            x: generateRandomBetweenRange(10, 40),
            y: generateRandomBetweenRange(-2, 2),
          },
          radius: 10,
          color: "red",
        })
      );
      shotFired = true;
      tempVariable = 0;
      if (shotFired) {
        mainBoss.currentSprite = mainBoss.sprite.hit.left;
        mainBoss.cropWidth = 398;
        mainBoss.spriteImgWidth = 353;
        shotFired = false;
        // Set a timeout to change back to stand position after 500 milliseconds
        setTimeout(() => {
          mainBoss.currentSprite = mainBoss.sprite.stand.left;
          mainBoss.cropWidth = 398;
          mainBoss.spriteImgWidth = 353;
        }, 500);
      }
    }
  }
}
