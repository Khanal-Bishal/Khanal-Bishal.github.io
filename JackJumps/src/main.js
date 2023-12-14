let playerCurrentPosition = 0;
let fps = 100;
let levelChanged = false;

/**
 * runs our game loop
 * @returns {}
 * @param {}
 *
 */

function animate() {
  audioMusicLevel1.play();
  audioMusicLevel1.volume = 0.1;

  // we first need to clear canvas and then update it
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //drawing backgrounds
  backgrounds.forEach((background) => {
    background.update();
    background.velocity.x = 0;
  });

  //drawing scoreBoard
  score.draw();

  //drawing platform
  platforms.forEach((platform) => {
    platform.update();
    platform.velocity.x = 0;
  });

  //drawing player
  player.update();

  //drawing mainboss
  if (mainBoss) {
    mainBoss.update();
  }

  //drawing moving blocks
  movingBlocks.forEach((movingBlock) => {
    movingBlock.update();
    // movingBlock.velocity.x = 0;
  });

  //drawing blocks
  blocks.forEach((block) => {
    block.update();
    block.velocity.x = 0;
  });

  //drawing flowers
  flowers.forEach((flower) => {
    flower.update();
  });

  //drawing goombas
  goombas.forEach((goomba) => {
    goomba.update();
  });

  //drawing lifes
  lifes.forEach((life) => {
    life.update();
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

  //drawing flag
  flags.forEach((flag) => {
    flag.update();
    flag.velocity.x = 0;
  });

  // drawing sharpnel
  sharpnels.forEach((sharpnel, index) => {
    sharpnel.update();
    if (sharpnel.duration < -200) {
      sharpnels.splice(index, 1);
    }
    if (
      sharpnel.position.x + sharpnel.radius >= canvas.width ||
      sharpnel.position.x <= 0
    ) {
      sharpnels.splice(index, 1);
    }
  });
  // drawing fireballs
  fireballs.forEach((fireball, index) => {
    fireball.update();
    if (fireball.duration < -200) {
      fireballs.splice(index, 1);
    }
    if (
      fireball.position.x + fireball.radius >= canvas.width ||
      fireball.position.x <= 0
    ) {
      fireballs.splice(index, 1);
    }
  });

  //checking  key press event conditions for limiting player moment
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
      particle.position.x -= SPEED * 0.02;
    } else if (keys.right.pressed) {
      particle.position.x += SPEED * 0.02;
    }
  });

  //DETECTING collision between PLAYER-PLATFORM
  platforms.forEach((platform) => {
    let hasCollided = detectRectCollision(player, platform);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //DETECTING collision between COIN-PLATFORM
  platforms.forEach((platform) => {
    coins.forEach((coin) => {
      let hasCollided = detectRectCollision(coin, platform);
      if (hasCollided) {
        coin.velocity.y = 0;
      }
    });
  });

  //DETECTING collision between PLAYER-BLOCK
  blocks.forEach((block) => {
    let hasCollided = detectRectCollision(player, block);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });
  //DETECTING collision between PLAYER-MOVINGBLOCK
  movingBlocks.forEach((movingBlock) => {
    if (
      player.position.x < movingBlock.position.x + movingBlock.width &&
      player.position.x + player.width > movingBlock.position.x &&
      player.position.y + player.height >= movingBlock.position.y &&
      player.position.y + player.velocity.y < movingBlock.position.y
    ) {
      console.log("Player has landed on the moving block");
      player.velocity.y = 0;
      player.position.x += movingBlock.velocity.x + player.velocity.x;
      // Adjust the player's position if needed to prevent overlap
      player.position.y = movingBlock.position.y - player.height;
    }
  });

  //DETECTING collision between PLAYER-TOP_OF_BLOCK
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockTop(player, block);
    if (hasCollided) {
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });
  //DETECTING collision between PLAYER-TOP_OF_MOVING_BLOCK
  movingBlocks.forEach((movingBlock) => {
    let hasCollided = hasCollidedBlockTop(player, movingBlock);
    if (hasCollided) {
      console.log("has collided top of moving block");
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });

  //DETECTING collision between PLAYER-SIDE_OF_BLOCK
  movingBlocks.forEach((block) => {
    let hasCollided = hasCollidedBlockSide(player, block);
    if (hasCollided) {
      player.velocity.x = 0;
    }
  });

  //detect collision between  GOOMBA-PLATFORM
  platforms.forEach((platform) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, platform)) {
        goomba.velocity.y = 0;
      }
    });
  });

  //DETECTING collision between FLOWER-PLATFORM
  platforms.forEach((platform) => {
    flowers.forEach((flower) => {
      let hasCollided = detectRectCollision(flower, platform);
      if (hasCollided) flower.velocity.y = 0;
    });
  });

  //DETECTING collision between PLAYER-COIN
  coins.forEach((coin, index) => {
    let hasCollided = rectangularCollisionDetection(player, coin);
    if (hasCollided) {
      audioCoin.play();
      console.log("Coin has collided");
      coinsCollected++;
      coins.splice(index, 1);
    }
  });

  //DETECTING collision between PLAYER-LIFE
  lifes.forEach((life, index) => {
    let hasCollided = rectangularCollisionDetection(player, life);
    if (hasCollided) {
      audioLife.play();
      health += 100 - health;
      lifes.splice(index, 1);
      console.log("life after regen" + health);
    }
  });

  //DETECTING collision between PLAYER-FLOWER
  flowers.forEach((flower, index) => {
    let hasCollided = rectangularCollisionDetection(player, flower);
    if (hasCollided) {
      audioFireFlower.play();
      player.powerUps.flowerPower = true;
      player.armour = true;
      flowers.splice(index, 1);
    }
  });

  //DETECTING top collision if PLAYER_STEPPED_OVER-GOOMBA
  goombas.forEach((goomba, index) => {
    if (detectTopCollision(player, goomba)) {
      player.velocity.y = -10;
      console.log("Goomba has died");
      audioGoombaSquash.play();
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
        audioDie.play();
        restartGame();
      }
      //player losing life animation
      for (let i = 0; i < 1; i++) {
        particles.push(
          new Particle({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2,
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 1.5,
            color: "white",
          })
        );
        particles.push(
          new Particle({
            position: {
              x: score.position.x,
              y: score.position.y,
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 1.5,
            color: "white",
          })
        );
      }

      if (player.armour == true) {
        audioLosePowerUp.play();
        player.powerUps.flowerPower = false;
        player.armour = false;
        player.opacity = 0;
        player.opacity = 0.2;
      } else {
        health -= 0.5;
        console.log(`Life remaining ${health}`);
      }
    }
  });

  //DETECTING collision between PLATFORM-SHARPNEL
  platforms.forEach((platform) => {
    sharpnels.forEach((sharpnel) => {
      if (
        sharpnel.position.y + sharpnel.radius <= platform.position.y &&
        sharpnel.position.y + sharpnel.radius + sharpnel.velocity.y >=
          platform.position.y &&
        sharpnel.position.x + sharpnel.radius >= platform.position.x &&
        sharpnel.position.x <= platform.position.x + platform.width
      ) {
        sharpnel.velocity.y = -0.7;
      }
    });
  });
  //DETECTING collision between BLOCK-SHARPNEL
  blocks.forEach((block) => {
    sharpnels.forEach((sharpnel) => {
      if (
        sharpnel.position.y + sharpnel.radius <= block.position.y &&
        sharpnel.position.y + sharpnel.radius + sharpnel.velocity.y >=
          block.position.y &&
        sharpnel.position.x + sharpnel.radius >= block.position.x &&
        sharpnel.position.x <= block.position.x + block.width
      ) {
        sharpnel.velocity.y = -0.7;
      }
    });
  });
  //DETECTING collision between PLATFORM-FIREBALLS
  platforms.forEach((platform) => {
    fireballs.forEach((fireball) => {
      if (
        fireball.position.y + fireball.radius <= platform.position.y &&
        fireball.position.y + fireball.radius + fireball.velocity.y >=
          platform.position.y &&
        fireball.position.x + fireball.radius >= platform.position.x &&
        fireball.position.x <= platform.position.x + platform.width
      ) {
        fireball.velocity.y = -0.7;
      }
    });
  });

  //DETECTING collision between BLOCKS-FIREBALLS
  blocks.forEach((block) => {
    fireballs.forEach((fireball) => {
      if (
        fireball.position.y + fireball.radius <= block.position.y &&
        fireball.position.y + fireball.radius + fireball.velocity.y >=
          block.position.y &&
        fireball.position.x + fireball.radius >= block.position.x &&
        fireball.position.x <= block.position.x + block.width
      ) {
        fireball.velocity.y = -0.7;
      }
    });
  });

  //DETECTING collision between PLATFORM-LIFE
  platforms.forEach((platform) => {
    lifes.forEach((life) => {
      let hasCollided = detectRectCollision(life, platform);
      if (hasCollided) {
        life.velocity.y = 0;
      }
    });
  });

  //DETECTING collision between GOOMBA-BLOCK
  blocks.forEach((block) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, block)) {
        goomba.velocity.y = 0;
      }
    });
  });

  //DETECTING collision between FLOWER-BLOCK
  blocks.forEach((block) => {
    flowers.forEach((flower) => {
      if (detectRectCollision(flower, block)) {
        flower.velocity.y = 0;
      }
    });
  });
  //DETECTING collision between COIN-BLOCK
  blocks.forEach((block) => {
    coins.forEach((coin) => {
      if (detectRectCollision(coin, block)) {
        coin.velocity.y = 0;
      }
    });
  });

  // DETECTING collision between SHARPNEL-GOOMBA
  goombas.forEach((goomba, index) => {
    sharpnels.forEach((sharpnel, sharpnelIndex) => {
      if (
        sharpnel.position.y + sharpnel.radius >= goomba.position.y &&
        sharpnel.position.y + sharpnel.radius + sharpnel.velocity.y >=
          goomba.position.y &&
        sharpnel.position.x + sharpnel.radius >= goomba.position.x &&
        sharpnel.position.x <= goomba.position.x + goomba.width &&
        goomba.position.y + goomba.height >= sharpnel.position.y
      ) {
        audioGoombaSquash.play();
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
        sharpnels.splice(sharpnelIndex, 1);
      }
    });
  });

  //DETECTING collision between MAINBOSS-PLATFORM
  platforms.forEach((platform) => {
    if (mainBoss) {
      let hasCollided = detectRectCollision(mainBoss, platform);
      if (hasCollided) {
        mainBoss.velocity.y = 0;
      }
    }
  });
  //DETECTING collision between MAINBOSS-BLOCKS
  blocks.forEach((block) => {
    if (mainBoss) {
      let hasCollided = detectRectCollision(mainBoss, block);
      if (hasCollided) {
        mainBoss.velocity.y = 0;
      }
    }
  });
  // DETECTING collision between PLAYER-FIREBALL
  fireballs.forEach((fireball, index) => {
    if (
      fireball.position.y + fireball.radius >= player.position.y &&
      fireball.position.y + fireball.radius + fireball.velocity.y >=
        player.position.y &&
      fireball.position.x + fireball.radius >= player.position.x &&
      fireball.position.x <= player.position.x + player.width &&
      player.position.y + player.height >= fireball.position.y
    ) {
      for (let i = 0; i < 30; i++) {
        particles.push(
          new Particle({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y + player.height / 2,
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 3.5,
            color: "white",
          })
        );
      }
      fireballs.splice(index, 1);
      health -= 10;
    }
  });

  // DETECTING collision between MAINBOSS-SHARPNEL

  sharpnels.forEach((sharpnel, index) => {
    if (
      sharpnel.position.y + sharpnel.radius >= mainBoss.position.y &&
      sharpnel.position.y + sharpnel.radius + sharpnel.velocity.y >=
        mainBoss.position.y &&
      sharpnel.position.x + sharpnel.radius >= mainBoss.position.x &&
      sharpnel.position.x <= mainBoss.position.x + mainBoss.width &&
      mainBoss.position.y + mainBoss.height >= sharpnel.position.y
    ) {
      for (let i = 0; i < 30; i++) {
        particles.push(
          new Particle({
            position: {
              x: mainBoss.position.x + mainBoss.width / 2,
              y: mainBoss.position.y + mainBoss.height / 2,
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 3.5,
            color: "red",
          })
        );
      }
      sharpnels.splice(index, 1);
      mainBossHealth -= generateRandomBetweenRange(5, 10);
      if (mainBossHealth < 0) {
        mainBoss.currentSprite = mainBoss.sprite.run.right;
        mainBoss.cropWidth = 398;
        mainBoss.spriteImgWidth = 353;
        mainBoss.velocity.x = 5;
        particles = [];
      }
    }
  });

  //DETECTING collision between PLAYER-MAINBOSS
  if (mainBoss) {
    if (
      player.position.x < mainBoss.position.x + mainBoss.width &&
      player.position.x + player.width > mainBoss.position.x
    ) {
      health -= 10;
    }
  }

  //setting opacity to 1 after player hits goomba with armour
  if (player.opacity <= 0.9) {
    setTimeout(() => {
      player.opacity = 1;
    }, 500);
  }

  //WIN GAME condition
  flags.forEach((flag) => {
    if (
      player.position.x + player.width >= flag.position.x &&
      flag.position.x + flag.width >= player.position.x &&
      player.position.y + player.height >= flag.position.y
    ) {
      keys.right.pressed = false;
      keys.left.pressed = false;

      if (!player.powerUps.flowerPower) {
        player.currentSprite = spriteStandRight;
        player.cropWidth = player.sprite.stand.cropWidth;
        player.spriteImgWidth = player.sprite.stand.width;
      } else {
        player.currentSprite = powerUpStandRight;
        player.cropWidth = player.sprite.stand.cropWidth;
        player.spriteImgWidth = player.sprite.stand.width;
      }

      disableUserInput = true;
      // audioFireworkBrust.play();

      audioFireworkWhistle.play();
      levelChanged = true;

      setTimeout(() => {
        if (levelChanged) {
          // currentLevel++;
          selectLevel(currentLevel++);
          levelChanged = false;
          disableUserInput = false;
          platformDistance = 0;
        }
      }, 5000);

      //explosion effect after winning game
      for (let i = 0; i < 1; i++) {
        particles.push(
          new Particle({
            position: {
              x: generateRandomBetweenRange(2, canvas.width),
              y: generateRandomBetweenRange(2, canvas.width),
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 3.5,
            color: `rgb(${Math.floor(Math.random() * 256)},
                         ${Math.floor(Math.random() * 256)},
                        ${Math.floor(Math.random() * 256)})`,
          })
        );
      }
    }
  });

  //GAME OVER
  if (player.position.y >= canvas.height) {
    player.velocity.y = +GRAVITY;
    audioDie.play();
    restartGame();
  }
  if (health <= 0) {
    restartGame();
  }
  setTimeout(() => {
    requestAnimationFrame(animate); //running game loop here with  recursion
  }, 1000 / fps);
}

animate();
