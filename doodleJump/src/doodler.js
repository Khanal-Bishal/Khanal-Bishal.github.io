/**
 * updates the game loop every time a event is triggred
 * @param {}
 */
function update() {
  requestAnimationFrame(update);
  //clearing the canvas everytime the game loop runs so that previous frame doesn't appears
  ctx.clearRect(0, 0, board.width, board.height);

  //moving doodle right or left if it falls off the left/right boudary
  doodler.x += velocityX;
  if (doodler.x + doodler.width < 0) {
    doodler.x = board.width;
  }
  if (doodler.x > BOARD_WIDTH) {
    doodler.x = 0;
  }

  velocityY += gravity;
  doodler.y += velocityY;

  //drawing doodle in game loop again and again
  ctx.drawImage(
    doodler.img,
    doodler.x,
    doodler.y,
    doodler.width,
    doodler.height
  );

  //drawing platform
  platforms.forEach((platform, index) => {
    if (velocityY < 0 && doodler.y < (BOARD_HEIGHT * 3) / 4) {
      platform.y -= initialVelocityY;
    }
    if (detectCollision(doodler, platform) && velocityY >= 0) {
      velocityY = initialVelocityY; //jump
    }

    ctx.drawImage(
      platform.img,
      platform.x,
      platform.y,
      platform.width,
      platform.height
    );
    //clear platform and add new platform
    while (platforms.length > 0 && platforms[0].y >= BOARD_HEIGHT) {
      platforms.shift();
      newPlatform();
    }
  });

  //score
  updateScore();
  ctx.fillStyle = "black";
  ctx.font = "12px serif";
  ctx.fillText(score, 5, 20);

  if (doodler.y > BOARD_HEIGHT) {
    gameOver();
  }
}

/**
 * moves the doodler by velocityX+desired velocity after the button is clicked might be either left or right
 * @param {object} e
 */
function moveDoodler(e) {
  //move right
  if (e.code == "ArrowRight" || e.code == "KeyD") {
    velocityX = 4;
    doodler.img = doodlerRightImg;
  } else if (e.code == "ArrowLeft" || e.code == "KeyA") {
    velocityX = -4;
    doodler.img = doodlerLeftImg;
  } else if (e.code == "Space" && gameOverState) {
    //reset the game
    doodler = {
      img: doodlerRightImg,
      x: doodlerX,
      y: doodlerY,
      width: DOODLER_WIDTH,
      height: DOODLER_HEIGHT,
    };

    velocityX = 0;
    velocityY = initialVelocityY;
    score = 0;
    gameOverState = false;
    placePlatforms();
  }
}

/**
 * used to place platforms in random positions of the board
 * @param {}
 */
function placePlatforms() {
  platforms = [];

  //starting platforms
  let platform = {
    img: platformImg,
    x: BOARD_WIDTH / 2 - DOODLER_WIDTH,
    y: BOARD_HEIGHT - 50,
    width: PLATFORM_WIDTH,
    height: PLATFORM_HEIGHT,
  };
  platforms.push(platform);

  for (let i = 0; i < 6; i++) {
    let randomX = Math.floor((Math.random() * BOARD_WIDTH * 3) / 4);
    let randomY = Math.floor((Math.random() * BOARD_HEIGHT * 3) / 4);
    let platform = {
      img: platformImg,
      x: randomX,
      y: BOARD_HEIGHT - 150 - 75 * i,
      width: PLATFORM_WIDTH,
      height: PLATFORM_HEIGHT,
    };

    platforms.push(platform);
  }
}

/**
 * used to create new platform after initial platform finishes
 * @param {}
 */

function newPlatform() {
  let randomX = Math.floor((Math.random() * BOARD_WIDTH * 3) / 4);
  let platform = {
    img: platformImg,
    x: randomX,
    y: -PLATFORM_HEIGHT,
    width: PLATFORM_WIDTH,
    height: PLATFORM_HEIGHT,
  };

  platforms.push(platform);
}

/**
 * used to detect collision between doodler and platform
 * @param {object} dood
 * @param {object} plat
 * @returns
 */
function detectCollision(dood, plat) {
  return (
    dood.x < plat.x + plat.width && //a's top left corner doesn't react b's top right corner
    dood.x + dood.width > plat.x && //a's top right corner passes b's top left corner
    dood.y < plat.y + plat.height && // a's top left corner doesnt reach b's bottom left corner
    dood.y + dood.height > plat.y //a's bottom left cornet passes b's top left corner
  );
}

/**
 * used to update the score of there occurs collision between platform and doodler
 * @param {}
 */
function updateScore() {
  let points = Math.floor(50 * Math.random());
  platforms.forEach((platform) => {
    if (detectCollision(doodler, platform)) {
      score += points;
    }
  });
}

/**
 * used to set gameOverState and text if doodler yCord is more than board height
 *@param {}
 */
function gameOver() {
  gameOverState = true;
  ctx.fillStyle = "black";
  ctx.font = "32px serif";
  ctx.fillText(`Your score : ${score}`, 10, 50);
  ctx.font = "16px serif";

  ctx.fillText("Press space to restart", BOARD_WIDTH / 2 - 50, 570);
}
