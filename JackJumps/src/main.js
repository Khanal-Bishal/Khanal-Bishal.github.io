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
        platform.position.x += SPEED;
        playerCurrentPosition -= SPEED;
      } else if (keys.right.pressed) {
        platform.position.x -= SPEED;
        playerCurrentPosition += SPEED;
      }
    });

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

    //parelleX scrolling for goombas on right/left key press
    goombas.forEach((goomba) => {
      if (keys.left.pressed && playerCurrentPosition > 0) {
        goomba.position.x += SPEED * 0.66;
      } else if (keys.right.pressed) {
        goomba.position.x -= SPEED * 0.66;
      }
    });
  }
  //parelleX scrolling for particles on right/left key press
  particles.forEach((particle) => {
    if (keys.left.pressed && playerCurrentPosition > 0) {
      particle.position.x += SPEED * 0.66;
    } else if (keys.right.pressed) {
      particle.position.x -= SPEED * 0.66;
    }
  });

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

  //detect collision between goombas and platform
  platforms.forEach((platform) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, platform)) {
        goomba.velocity.y = 0;
      }
    });
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
              radius: Math.random() * 2,
            })
          );
        }
        goombas.splice(index, 1);
      }, 0);
    } else if (
      player.position.x + player.width >= goomba.position.x &&
      goomba.position.x + goomba.width >= player.position.x &&
      player.position.y + player.height >= goomba.position.y
    ) {
      console.log("you die");
      //restartGame()
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
