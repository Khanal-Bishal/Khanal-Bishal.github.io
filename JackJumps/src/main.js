let playerCurrentPosition = 0;
let health = 100;
let coinsCollected = 0;
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
    background.update();
    background.velocity.x = 0;
  });

  //drawing platform
  platforms.forEach((platform) => {
    platform.update();
    platform.velocity.x = 0;
  });

  //drawing player
  player.update();

  //drawing blocks
  blocks.forEach((block) => {
    block.update();
    block.velocity.x = 0;
  });

  //drawing goombas
  goombas.forEach((goomba) => {
    goomba.update();
  });

  //drawing particles (on goombas explosion)
  particles.forEach((particle, index) => {
    particle.update();
    if (particle.duration == index) {
      particles.splice(index, 1);
    }
  });

  //drawing coins
  coins.forEach((coin) => {
    coin.update();
  });

  //checking  key press event conditions
  if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed &&
      playerCurrentPosition > 0 &&
      player.position.x > canvas.width / 5)
  ) {
    player.velocity.x = -SPEED;
  } else if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = SPEED;
  } else {
    player.velocity.x = 0;
    //scrolling the platforms s
    platforms.forEach((platform) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        platform.velocity.x = SPEED;
        playerCurrentPosition -= SPEED;
      } else if (keys.right.pressed) {
        platform.velocity.x = -SPEED;
        playerCurrentPosition += SPEED;
      }
    });

    //parrelX scrolling of background on  right/left key press
    backgrounds.forEach((background) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        background.velocity.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        background.velocity.x -= SPEED * 0.66;
      }
    });

    //parallX scrooling of coin on right/left  key press
    coins.forEach((coin) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        coin.position.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        coin.position.x -= SPEED;
      }
    });

    //parelleX scrolling of blocks on right/left key press
    blocks.forEach((block) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        block.velocity.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        block.velocity.x -= SPEED * 0.66;
      }
    });

    //parelleX scrolling for goombas on right/left key press
    goombas.forEach((goomba) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        goomba.position.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        goomba.position.x -= SPEED;
      }
    });
  }
  //parelleX scrolling for particles on right/ledwft key press
  particles.forEach((particle) => {
    if (keys.left.pressed && playerCurrentPosition > 0) {
      particle.position.x -= SPEED * 0.02;
    } else if (keys.right.pressed) {
      particle.position.x += SPEED * 0.02;
    }
  });

  //detecting collision between player and platform
  platforms.forEach((platform) => {
    let hasCollided = detectRectCollision(player, platform);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //detect collision between coin and platform
  platforms.forEach((platform) => {
    coins.forEach((coin) => {
      let hasCollided = detectRectCollision(coin, platform);
      if (hasCollided) {
        coin.velocity.y = 0;
      }
    });
  });

  //detecting collision between player and blocks
  blocks.forEach((block) => {
    let hasCollided = detectRectCollision(player, block);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //detecting collision between player and top of block
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockTop(player, block);
    if (hasCollided) {
      console.log("has collided top");
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });

  //detecting collision between player and side of block
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockSide(player, block);
    if (hasCollided) {
      console.log("has collided top");
      player.velocity.x = 0;
    }
  });

  //detect collision between goombas and platform
  platforms.forEach((platform) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, platform)) {
        goomba.velocity.y = 0;
      }
    });
  });

  //detecting collision between player and coin
  coins.forEach((coin, index) => {
    let hasCollided =
      detectRectCollision(player, coin) || hasCollidedBlockSide(player, coin);
    if (hasCollided) {
      coinsCollected++;
      coins.splice(index, 1);
      console.log(`Coin collected ${coinsCollected}`);
    }
  });

  //detecting top collision if player has stepped over goomba
  goombas.forEach((goomba, index) => {
    if (detectTopCollision(player, goomba)) {
      player.velocity.y = -10;
      console.log("Goomba has died");

      setTimeout(() => {
        for (let i = 0; i < 30; i++) {
          particles.push(
            new Particle({
              position: {
                x: goomba.position.x + goomba.width / 2,
                y: goomba.position.y + goomba.height / 2,
              },
              velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
              radius: Math.random() * 3.5,
            })
          );
        }
        goombas.splice(index, 1);
      }, 0);
    }
    //player has collided with goomba (reduce life)
    else if (
      player.position.x + player.width >= goomba.position.x &&
      goomba.position.x + goomba.width >= player.position.x &&
      player.position.y + player.height >= goomba.position.y
    ) {
      if (health <= 0) {
        console.log("you die");
        restartGame();
      }

      health -= 0.5;
      console.log(`Life redmaining ${health}`);
    }
  });

  //game over
  if (player.position.y >= canvas.height) {
    player.velocity.y = +GRAVITY;
    restartGame();
  }

  if (player.velocity.y == 0) {
    isGrounded = true;
    isJumping = false;
  }
  requestAnimationFrame(animate); //running game loop here with  recursion
}
animate();
