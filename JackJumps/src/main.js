let playerCurrentPosition = 0;
/**
 * runs our game loop
 * @returns {}
 * @param {}
 *
 */

function animate() {
  // we first need to clear canvas and then update it
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //drawing backgrounds
  backgrounds.forEach((background) => {
    background.draw();
  });

  //drawing platform
  platforms.forEach((platform) => {
    platform.draw();
  });

  player.update();

  //drawing blocks
  blocks.forEach((block) => {
    block.draw();
  });

  //checking  key press event conditions
  if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && playerCurrentPosition > 0 && player.position.x > 0)
  ) {
    player.velocity.x = -SPEED;
  } else if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = SPEED;
  } else {
    player.velocity.x = 0;
    platforms.forEach((platform) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        platform.position.x += SPEED;
        playerCurrentPosition -= SPEED;
      } else if (keys.right.pressed) {
        platform.position.x -= SPEED;
        playerCurrentPosition += SPEED;
      }
    });

    console.log(playerCurrentPosition);
    //parrelX scrolling of background on  right/left key press
    backgrounds.forEach((background) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        background.position.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        background.position.x -= SPEED * 0.66;
      }
    });

    //parelleX scrolling of blocks on right/left key press
    blocks.forEach((block) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        block.position.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        block.position.x -= SPEED * 0.66;
      }
    });
  }

  //detecting collision between player and platform
  platforms.forEach((platform) => {
    let hasCollided = detectRectCollision(player, platform);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //detecting collision between player and blocks
  blocks.forEach((block) => {
    let hasCollided = detectRectCollision(player, block);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //game over
  if (player.position.y >= canvas.height) {
    player.velocity.y = +GRAVITY;
    // restartGame();
  }
  requestAnimationFrame(animate); //running game loop here with  recursion
}
animate();
