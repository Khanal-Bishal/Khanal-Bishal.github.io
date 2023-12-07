const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
let isJumping = false;
let isGrounded = true;

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
  switch (key) {
    case "w" || "W":
      if (isJumping == false && isGrounded == true) {
        player.velocity.y = -15;
        isJumping = true;
        isGrounded = false;
      }

      break;
    case "a" || "A":
      keys.left.pressed = true;
      player.currentSprite = spriteRunLeft;
      player.cropWidth = player.sprite.run.cropWidth;
      player.spriteImgWidth = player.sprite.run.width;
      break;
    case "s" || "S":
      console.log("this is down");
      break;
    case "d" || "D":
      keys.right.pressed = true;
      player.currentSprite = spriteRunRight;
      player.cropWidth = player.sprite.run.cropWidth;
      player.spriteImgWidth = player.sprite.run.width;

      break;
    default:
      break;
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
  switch (key) {
    case "w" || "W":
      isJumping = false;
      isGrounded = true;
      break;
    case "a" || "A":
      keys.left.pressed = false;
      player.currentSprite = spriteStandLeft;
      player.cropWidth = player.sprite.stand.cropWidth;
      player.spriteImgWidth = player.sprite.stand.width;

      break;
    case "s" || "S":
      console.log("this is down");
      break;
    case "d" || "D":
      keys.right.pressed = false;
      player.currentSprite = spriteStandRight;
      player.cropWidth = player.sprite.stand.cropWidth;
      player.spriteImgWidth = player.sprite.stand.width;

      break;
    default:
      break;
  }
});
