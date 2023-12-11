let playerCurrentPosition = 0;

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

  //drawing blocks
  blocks.forEach((block) => {
    block.update();
    block.velocity.x = 0;
  });

  //drawing flowers
  flowers.forEach((flower) => {
    flower.update();
  });

  //drawing flytrap
  // flytraps.forEach((flytrap) => {
  //   flytrap.update();
  // });

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

  //DETECTING collision between PLAYER_PLATFORM
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

  //DETECTING collision between PLAYER-TOP_OF_BLOCK
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockTop(player, block);
    if (hasCollided) {
      console.log("has collided top");
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });

  //DETECTING collision between PLAYER-SIDE_OF_BLOCK
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockSide(player, block);
    if (hasCollided) {
      console.log("has collided top");
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
      console.log(`Coin collected ${coinsCollected}`);
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
        sharpnel.position.x <= goomba.position.x + goomba.width
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

  //limiting duration of flower-buff
  // if (player.powerUps.flowerPower) {
  //   setTimeout(() => {
  //     player.powerUps.flowerPower = false;
  //   }, 10000);
  // }

  //setting opacity to 1 after player hits goomba with armour
  if (player.opacity <= 0.9) {
    setTimeout(() => {
      player.opacity = 1;
    }, 500);
  }

  //win game condition
  flags.forEach((flag) => {
    if (
      player.position.x + player.width >= flag.position.x &&
      flag.position.x + flag.width >= player.position.x &&
      player.position.y + player.height >= flag.position.y
    ) {
      console.log(`you win`);
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

  //game over
  if (player.position.y >= canvas.height) {
    player.velocity.y = +GRAVITY;
    audioDie.play();
    restartGame();
  }
  requestAnimationFrame(animate); //running game loop here with  recursion
}

animate();
