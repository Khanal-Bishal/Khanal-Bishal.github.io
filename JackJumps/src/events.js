const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
let isJumping = false;
let isGrounded = true;
let lastKeyPressed;
let disableUserInput = false;

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

/**
 * event listner for key press
 *
 * @param {event} keydown
 * @param {arrow function} function
 */

window.addEventListener("keydown", ({ key }) => {
  if (!disableUserInput) {
    switch (key) {
      case "w" || "W":
        if (player.powerUps.flowerPower) {
          audioJump.play();
          if (player.velocity.y < 2) {
            player.velocity.y = -20;
            isJumping = true;
            isGrounded = false;
          }
        }
        if (player.velocity.y == 0) {
          audioJump.play();
          player.velocity.y = -16;
          isJumping = true;
          isGrounded = false;
        }

        break;
      case "a" || "A":
        keys.left.pressed = true;
        player.currentSprite = spriteRunLeft;
        player.cropWidth = player.sprite.run.cropWidth;
        player.spriteImgWidth = player.sprite.run.width;

        if (player.powerUps.flowerPower) {
          player.currentSprite = powerUpRunLeft;
          player.cropWidth = player.sprite.run.cropWidth;
          player.spriteImgWidth = player.sprite.run.width;
        }
        lastKeyPressed = "left";
        break;
      case "s" || "S":
        console.log("this is down");
        break;
      case "d" || "D":
        keys.right.pressed = true;
        player.currentSprite = spriteRunRight;
        player.cropWidth = player.sprite.run.cropWidth;
        player.spriteImgWidth = player.sprite.run.width;
        if (player.powerUps.flowerPower) {
          player.currentSprite = powerUpRunRight;
          player.cropWidth = player.sprite.run.cropWidth;
          player.spriteImgWidth = player.sprite.run.width;
        }
        lastKeyPressed = "right";
        break;
      case " ":
        if (player.powerUps.flowerPower) {
          console.log("space is pressed");
          audioShoot.play();
          sharpnels.push(
            new Sharpnel({
              position: {
                x: player.position.x + player.width / 2,
                y: player.position.y + player.height / 2,
              },
              velocity: {
                x: 4,
                y: 1.2,
              },
              radius: 6,
            })
          );
        }
        break;
      default:
        break;
    }
  }
});

/**
 * event listner for when we release key
 *
 * @param {event} keyup
 * @param {callback function }
 *
 * returns {}
 */
window.addEventListener("keyup", ({ key }) => {
  if (!disableUserInput) {
    switch (key) {
      case "w" || "W":
        // isJumping = false;
        // isGrounded = true;
        break;
      case "a" || "A":
        keys.left.pressed = false;
        player.currentSprite = spriteStandLeft;
        player.cropWidth = player.sprite.stand.cropWidth;
        player.spriteImgWidth = player.sprite.stand.width;

        if (player.powerUps.flowerPower) {
          player.currentSprite = powerUpStandLeft;
          player.cropWidth = player.sprite.stand.cropWidth;
          player.spriteImgWidth = player.sprite.stand.width;
        }
        lastKeyPressed = "left";
        break;
      case "s" || "S":
        console.log("this is down");
        break;
      case "d" || "D":
        keys.right.pressed = false;
        player.currentSprite = spriteStandRight;
        player.cropWidth = player.sprite.stand.cropWidth;
        player.spriteImgWidth = player.sprite.stand.width;

        if (player.powerUps.flowerPower) {
          player.currentSprite = powerUpStandRight;
          player.cropWidth = player.sprite.stand.cropWidth;
          player.spriteImgWidth = player.sprite.stand.width;
        }
        lastKeyPressed = "right";
        break;
      default:
        break;
    }
  }
});
