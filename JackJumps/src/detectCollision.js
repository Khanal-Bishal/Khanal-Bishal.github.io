function detectCollision() {
  //DETECTING COLLISION BETWEEN PLAYER-PLATFORM
  platforms.forEach((platform) => {
    let hasCollided = detectRectCollision(player, platform);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //DETECTING COLLISION BETWEEN COIN-PLATFORM
  platforms.forEach((platform) => {
    coins.forEach((coin) => {
      let hasCollided = detectRectCollision(coin, platform);
      if (hasCollided) {
        coin.velocity.y = 0;
      }
    });
  });

  //DETECTING COLLISION BETWEEN PLAYER-BLOCK
  blocks.forEach((block) => {
    let hasCollided = detectRectCollision(player, block);
    if (hasCollided) {
      player.velocity.y = 0;
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-MOVINGBLOCK
  movingBlocks.forEach((movingBlock) => {
    if (
      player.position.x < movingBlock.position.x + movingBlock.width &&
      player.position.x + player.width > movingBlock.position.x &&
      player.position.y + player.height >= movingBlock.position.y &&
      player.position.y + player.velocity.y < movingBlock.position.y
    ) {
      player.velocity.y = 0;
      player.position.x += movingBlock.velocity.x + player.velocity.x;
      // Adjust the player's position if needed to prevent overlap
      player.position.y = movingBlock.position.y - player.height;
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-TOP_OF_BLOCK
  blocks.forEach((block) => {
    let hasCollided = hasCollidedBlockTop(player, block);
    if (hasCollided) {
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-TOP_OF_MOVING_BLOCK
  movingBlocks.forEach((movingBlock) => {
    let hasCollided = hasCollidedBlockTop(player, movingBlock);
    if (hasCollided) {
      player.velocity.y = -player.velocity.y * 0.4;
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-SIDE_OF_BLOCK
  movingBlocks.forEach((block) => {
    let hasCollided = hasCollidedBlockSide(player, block);
    if (hasCollided) {
      player.velocity.x = 0;
    }
  });

  //DETECTING COLLISION BETWEEN  GOOMBA-PLATFORM
  platforms.forEach((platform) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, platform)) {
        goomba.velocity.y = 0;
      }
    });
  });

  //DETECTING COLLISION BETWEEN  FLOWER-PLATFORM
  platforms.forEach((platform) => {
    flowers.forEach((flower) => {
      let hasCollided = detectRectCollision(flower, platform);
      if (hasCollided) flower.velocity.y = 0;
    });
  });

  //DETECTING COLLISION BETWEEN PLAYER-COIN
  coins.forEach((coin, index) => {
    let hasCollided = rectangularCollisionDetection(player, coin);
    if (hasCollided) {
      audioCoin.play();
      coinsCollected++;
      coins.splice(index, 1);
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-LIFE
  lifes.forEach((life, index) => {
    let hasCollided = rectangularCollisionDetection(player, life);
    if (hasCollided) {
      audioLife.play();
      health += 100 - health;
      progressBar.value = health;
      lifes.splice(index, 1);
      console.log("life after regen" + health);
    }
  });

  //DETECTING COLLISION BETWEEN PLAYER-FLOWER
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
      audioGoombaSquash.play();
      coinsCollected += 0.1;
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
        progressBar.value = health;
        particles.push(
          new Particle({
            position: {
              x: canvas.width / 2,
              y: 0,
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
      }
    }
  });

  //DETECTING COLLISION BETWEEN SHARPNEL-PLATFORM
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

  //DETECTING COLLISION BETWEEN BLOCK-SHARPNEL
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

  //DETECTING COLLISION BETWEEN FIREBALLS-PLATFORM
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

  //DETECTING COLLISION BETWEEN BLOCKS-FIREBALLS
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

  //DETECTING COLLISION BETWEEN LIFE-PLATFORM
  platforms.forEach((platform) => {
    lifes.forEach((life) => {
      let hasCollided = detectRectCollision(life, platform);
      if (hasCollided) {
        life.velocity.y = 0;
      }
    });
  });

  //DETECTING COLLISION BETWEEN GOOMBA-BLOCK
  blocks.forEach((block) => {
    goombas.forEach((goomba) => {
      if (detectRectCollision(goomba, block)) {
        goomba.velocity.y = 0;
      }
    });
  });

  //DETECTING COLLISION BETWEEN FLOWER-BLOCK
  blocks.forEach((block) => {
    flowers.forEach((flower) => {
      if (detectRectCollision(flower, block)) {
        flower.velocity.y = 0;
      }
    });
  });
  //DETECTING COLLISION BETWEEN COIN-BLOCK
  blocks.forEach((block) => {
    coins.forEach((coin) => {
      if (detectRectCollision(coin, block)) {
        coin.velocity.y = 0;
      }
    });
  });

  // DETECTING COLLISION BETWEEN SHARPNEL-GOOMBA
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
        coinsCollected += 0.2;

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

  //DETECTING COLLISION BETWEEN MAINBOSS-PLATFORM
  platforms.forEach((platform) => {
    if (mainBoss) {
      let hasCollided = detectRectCollision(mainBoss, platform);
      if (hasCollided) {
        mainBoss.velocity.y = 0;
      }
    }
  });
  //DETECTING COLLISION BETWEEN MAINBOSS-BLOCKS
  blocks.forEach((block) => {
    if (mainBoss) {
      let hasCollided = detectRectCollision(mainBoss, block);
      if (hasCollided) {
        mainBoss.velocity.y = 0;
      }
    }
  });
  // DETECTING COLLISION BETWEEN PLAYER-FIREBALL
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
        particles.push(
          new Particle({
            position: {
              x: canvas.width / 2,
              y: 0,
            },
            velocity: { x: Math.random() - 0.5, y: Math.random() - 0.5 },
            radius: Math.random() * 1.5,
            color: "white",
          })
        );
      }
      fireballs.splice(index, 1);
      health -= 10;
      progressBar.value = health;
    }
  });

  // DETECTING COLLISION BETWEEN MAINBOSS-SHARPNEL
  sharpnels.forEach((sharpnel, index) => {
    if (
      sharpnel.position.y + sharpnel.radius >= mainBoss.position.y &&
      sharpnel.position.y + sharpnel.radius + sharpnel.velocity.y >=
        mainBoss.position.y &&
      sharpnel.position.x + sharpnel.radius >= mainBoss.position.x &&
      sharpnel.position.x <= mainBoss.position.x + mainBoss.width &&
      mainBoss.position.y + mainBoss.height >= sharpnel.position.y
    ) {
      for (let i = 0; i < 10; i++) {
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

  //DETECTING COLLISION BETWEEN PLAYER-MAINBOSS
  if (mainBoss) {
    if (
      player.position.x < mainBoss.position.x + mainBoss.width &&
      player.position.x + player.width > mainBoss.position.x
    ) {
      health -= 10;
    }
  }
}
