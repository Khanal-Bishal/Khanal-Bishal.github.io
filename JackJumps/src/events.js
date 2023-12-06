const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

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
 * @param {event} keydown
 * @param {arrow function} function
 */

window.addEventListener("keydown", ({ key }) => {
  switch (key) {
    case "w" || "W":
      player.velocity.y = -20;
      break;
    case "a" || "A":
      keys.left.pressed = true;
      break;
    case "s" || "S":
      console.log("this is down");
      break;
    case "d" || "D":
      keys.right.pressed = true;

      break;
    default:
      break;
  }
});

/**
 * event listner for when we release key
 * @param {event} keyup
 * @param {callback function }
 * returns {}
 */
window.addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "w" || "W":
      break;
    case "a" || "A":
      keys.left.pressed = false;

      break;
    case "s" || "S":
      console.log("this is down");
      break;
    case "d" || "D":
      keys.right.pressed = false;

      break;
    default:
      break;
  }
});
