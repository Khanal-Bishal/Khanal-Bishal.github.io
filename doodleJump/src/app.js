/**
 * board variables
 */
let board;

/**
 * doodler variables
 */
let doodlerX = BOARD_WIDTH / 2 - DOODLER_WIDTH;
let doodlerY = (BOARD_HEIGHT * 7) / 8 - DOODLER_HEIGHT;
let doodlerRightImg;
let doodlerLeftImg;

let doodler = {
  img: null,
  x: doodlerX,
  y: doodlerY,
  width: DOODLER_WIDTH,
  height: DOODLER_HEIGHT,
};

/**
 * game phyics and velocity variables
 */
let velocityX = 0;
let velocityY = 0; // doodler jump speed
let initialVelocityY = -6; //starting velocity Y
let gravity = 0.2;

/**
 * platform varaibes
 */

let platforms = [];
let platformImg;

let gameOverState = false;
let ctx;

//score
let score = 0;

/**
 * when window loads
 */
window.addEventListener("load", () => {
  board = document.querySelector("#board");
  ctx = board.getContext("2d"); //get the context of the board
  board.height = BOARD_HEIGHT;
  board.width = BOARD_WIDTH;

  //loading the image of doodler
  doodlerRightImg = new Image();
  doodlerRightImg.src = "./assets/doodler-right.png";
  doodler.img = doodlerRightImg;

  doodlerRightImg.addEventListener("load", () => {
    ctx.drawImage(
      doodler.img,
      doodler.x,
      doodler.y,
      doodler.width,
      doodler.height
    );
  });

  doodlerLeftImg = new Image();
  doodlerLeftImg.src = "./assets/doodler-left.png";

  platformImg = new Image();
  platformImg.src = "./assets/platform.png";

  velocityY = initialVelocityY; // here initial velocity is -6px
  placePlatforms();
  requestAnimationFrame(update);
  document.addEventListener("keydown", moveDoodler);
});
