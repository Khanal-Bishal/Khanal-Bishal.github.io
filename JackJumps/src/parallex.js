/**
 * performs  parallex scorlling for all game elements
 */
function paralleX() {
  //checking  key press event conditions for limiting player moment
  if (
    (keys.left.pressed && player.position.x >= 100) ||
    (keys.left.pressed &&
      playerCurrentPosition > 0 &&
      player.position.x > canvas.width / 5)
  ) {
    player.velocity.x = -SPEED;
  } else if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = SPEED;
  } else {
    player.velocity.x = 0;

    //paralleX scrolling the PLATFORM
    platforms.forEach((platform) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        platform.velocity.x = SPEED;
        playerCurrentPosition -= SPEED;
      } else if (keys.right.pressed) {
        platform.velocity.x = -SPEED;
        playerCurrentPosition += SPEED;
      }
    });

    //parrelX scrolling of BACKGROUND on  right/left key press
    backgrounds.forEach((background) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        background.velocity.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        background.velocity.x -= SPEED * 0.66;
      }
    });

    //parallx scrolling of MAINBOSS on right/left key press
    if (mainBoss) {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        mainBoss.position.x += SPEED;
      } else if (keys.right.pressed) {
        mainBoss.position.x -= SPEED;
      }
    }

    //parallX scrooling of COIN on right/left  key press
    coins.forEach((coin) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        coin.position.x += SPEED;
      } else if (keys.right.pressed) {
        coin.position.x -= SPEED;
      }
    });
    //parallX scrooling of LIFE on right/left  key press
    lifes.forEach((life) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        life.position.x += SPEED;
      } else if (keys.right.pressed) {
        life.position.x -= SPEED;
      }
    });

    //parallX scrooling of FLOWER on right/left  key press
    flowers.forEach((flower) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        flower.position.x += SPEED;
      } else if (keys.right.pressed) {
        flower.position.x -= SPEED;
      }
    });

    //parelleX scrolling of BLOCKS on right/left key press
    blocks.forEach((block) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        block.velocity.x += SPEED * 0.98;
      } else if (keys.right.pressed) {
        block.velocity.x -= SPEED * 0.98;
      }
    });
    //parelleX scrolling of MOVING-BLOCKS on right/left key press
    movingBlocks.forEach((movingBlock) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        movingBlock.position.x += SPEED;
      } else if (keys.right.pressed) {
        movingBlock.position.x -= SPEED;
      }
    });
    //parelleX scrolling of FLAGS on right/left key press
    flags.forEach((flag) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        flag.velocity.x += SPEED * 0.98;
      } else if (keys.right.pressed) {
        flag.velocity.x -= SPEED * 0.98;
      }
    });

    //parelleX scrolling for GOOMBAS on right/left key press
    goombas.forEach((goomba) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        goomba.position.x += SPEED;
      } else if (keys.right.pressed) {
        goomba.position.x -= SPEED;
      }
    });
  }

  //parelleX scrolling for PARTICLES on right/ledwft key press
  particles.forEach((particle) => {
    if (keys.left.pressed && playerCurrentPosition > 0) {
      particle.position.x += SPEED * 0.02;
    } else if (keys.right.pressed) {
      particle.position.x -= SPEED * 0.02;
    }
  });

  //parelleX scrolling for FIREBALL on right/ledwft key press
  fireballs.forEach((fireball) => {
    if (keys.left.pressed && playerCurrentPosition > 0) {
      fireball.position.x += SPEED + player.velocity.x;
    } else if (keys.right.pressed) {
      fireball.position.x -= SPEED - player.velocity.x;
    }
  });
}
