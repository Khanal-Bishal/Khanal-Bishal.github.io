/**
 * check/performs drawing of elements, scrolling bg and elements and detection colliosion along with win/lose condition
 *
 * @returns {}
 */
function game() {
  if (pauseCanvas) return;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawElements();
  paralleX();
  detectCollision();

  //------------setting opacity to 1 after player hits goomba ------------------
  if (player.opacity <= 0.9) {
    setTimeout(() => {
      player.opacity = 1;
    }, 500);
  }

  //----------------WIN GAME condition----------------
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
      audioFireworkWhistle.play();
      levelChanged = true;

      setTimeout(() => {
        if (levelChanged) {
          if (currentLevel <= 3) {
            currentLevel++;
          } else {
            return;
          }

          selectLevel(currentLevel);
          levelChanged = false;
          disableUserInput = false;
          platformDistance = 0;
          gameData = { level: currentLevel, gold: coinsCollected };
          localStorage.setItem("level", JSON.stringify(gameData));
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

  //----------------------GAME OVER (after falling from pitfall)--------------------------
  if (player.position.y >= canvas.height) {
    player.velocity.y = +GRAVITY;
    audioDie.play();
    restartGame();
  }
  if (health <= 0) {
    restartGame();
  }
}
