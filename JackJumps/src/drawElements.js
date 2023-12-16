function drawElements() {
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
}
