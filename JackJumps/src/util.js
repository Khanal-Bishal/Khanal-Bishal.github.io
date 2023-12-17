/**
 * detects whether objA has collided with objB and viceversa
 *
 * @param {object} objA
 * @param {object} objB
 *
 * @returns boolean
 */
function detectRectCollision(objA, objB) {
  return (
    objA.position.x + objA.width >= objB.position.x &&
    objB.position.x + objB.width >= objA.position.x &&
    objA.position.y + objA.height + objA.velocity.y >= objB.position.y &&
    objB.position.y >= objA.position.y + objA.height
  );
}

/**
 * creates image with provided path and returns image object
 *
 * @param {path string} path
 *
 * @returns {image object}
 */
function createImage(path) {
  let image = new Image();
  image.src = path;
  return image;
}

/**
 * return boolean if objectA has collided with objB vetically
 *
 * @param {object} objA
 * @param {object} objB
 *
 * @returns
 */
function detectTopCollision(objA, objB) {
  return (
    objA.position.x + objA.width >= objB.position.x &&
    objB.position.x + objB.width >= objA.position.x &&
    objA.position.y + objA.height + objA.velocity.y >= objB.position.y &&
    objB.position.y >= objA.position.y + objA.height
  );
}

/**
 *  returns random number between given range of number
 *
 * @param {number} min
 * @param {number} max
 *
 * @returns {number}
 */
function generateRandomBetweenRange(min, max) {
  return Math.floor(min + (Math.random() * max - min));
}

/**
 * checks whether image has loaded or not
 *
 * @param {object} image
 */
function checkTwoImagesLoaded(image1, image2, callback) {
  let loadedCount = 0;

  function imageLoaded() {
    loadedCount++;

    if (loadedCount === 2) {
      console.log("Both images have loaded.");
      callback();
    }
  }

  image1.onload = imageLoaded;
  image2.onload = imageLoaded;
}

/**
 *  creates new instance if image has loaded
 *
 * @param {Image} image1
 * @param {function} callback
 *
 * @returns {callback}
 */
function checkImageLoaded(image1, callback) {
  let loadedCount = 0;

  function imageLoaded() {
    loadedCount++;

    if (loadedCount === 1) {
      console.log(" images have loaded.");
      callback();
    }
  }

  image1.onload = imageLoaded;
}

/**
 *  checks if player has collided with top of block
 *
 *  @param {Player} player
 * @param {Block} block
 *
 * @returns {boolean}
 */
function hasCollidedBlockTop(player, block) {
  return (
    // player.position.y - player.velocity.y >= block.position.y + block.height &&
    player.position.y <= block.position.y + block.height &&
    player.position.y - player.velocity.y >= block.position.y + block.height &&
    player.position.x + player.width >= block.position.x &&
    block.position.x + block.width >= player.position.x
  );
}

/**
 * checks if players has collided with side of block
 *
 * @param {Player} player
 * @param {Block} block
 *
 * @returns {boolean}
 */
function hasCollidedBlockSide(player, block) {
  return (
    player.position.x + player.width - player.velocity.x >= block.position.x &&
    block.position.x + block.width >= player.position.x - player.velocity.x &&
    player.position.y + player.height >= block.position.y &&
    player.position.y <= block.position.y + block.height
  );
}

/**
 * detects wheather two retangles have collided with each other
 *
 * @param {Player} player
 * @param {Flower/Coin} object can be either flower or coin
 *
 * @returns {boolean}
 */
function rectangularCollisionDetection(player, object) {
  return (
    player.position.x + player.width >= object.position.x &&
    player.position.x <= object.position.x + object.width &&
    player.position.y + player.height >= object.position.y &&
    player.position.y <= object.position.y + object.height
  );
}

/**
 * detects if object is on top of platform
 *
 * @param {Player} object
 * @param {Platform} platform
 *
 * @returns {boolean}
 */
function isOnTopOfPlatformCircle({ object, platform }) {
  return (
    object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  );
}

/**
 *  detects collision between objA and objB considering motion
 * @param {object} objA
 * @param {object} objB
 *
 * @returns {boolean}
 */
function detectCollisionOnMotion(objA, objB) {
  return (
    objA.position.x < objB.position.x + objB.width &&
    objA.position.x + objA.width > objB.position.x &&
    objA.position.y < objB.position.y + objB.height &&
    objA.position.y + objA.height > objB.position.y &&
    objA.velocity.y > 0
  );
}

/**
 * initalizes level
 */
function initializeLevel() {
  console.log("initializing current level" + currentLevel);
  backgrounds = [];
  platforms = [];
  blocks = [];
  flowers = [];
  lifes = [];
  goombas = [];
  flags = [];
  coins = [];
  platformDistance = 0;
  playerCurrentPosition = 0;
  particles = [];
  fireballs = [];
  movingBlocks = [];
  health = 100;
  progressBar.value = health;

  //drawing backgorund
  initializeBackground();

  //drawing groundPlatform
  initializeMap();

  //drawing flower
  initializeFlower();

  //drawing block
  initializeBlock();

  //drawing goomba
  initializeGoomba();

  //drawing coin
  initializeCoin();

  //drawing life/health buff
  initializeLife();

  //drawing flag pole
  initializeFlag();

  //drawing mainBoss
  initializeMainBoss();

  //drawing MovingBlocks
  initializeMovingBlock();

  //setmain boss health
  setMainBossHealth();

  //drawing player
  player = new Player();
}

/**
 * selects the current level
 *
 * @param {number} level
 */
function selectLevel(currentLevel) {
  // if (!audio.musicLevel1.playing()) audio.musicLevel1.play();
  switch (currentLevel) {
    case 1:
      initializeLevel();
      bodyBackground.style.backgroundImage = "url(img/background.png)";

      break;
    case 2:
      initializeLevel();
      bodyBackground.style.backgroundImage = "url(img/level2/background.png)";

      break;
    case 3:
      initializeLevel();
      bodyBackground.style.backgroundImage = "url(img/level3/background.png)";
      break;

    default:
      audioFireworkWhistle.pause();
      winScreen.style.display = "flex";
      gameCanvas.style.display = "none";
      disableUserInput = false;
      break;
  }
}

/**
 *
 * takes image array as input and checks whether image has loaded or not
 * @param {[Image]} images
 * @param {*} callback
 */
function checkAllImagesLoaded(images, callback) {
  let loadedCount = 0;
  const totalImages = images.length;

  function imageLoaded() {
    loadedCount++;

    if (loadedCount === totalImages) {
      console.log(`${totalImages} images have loaded.`);
      callback();
    }
  }

  images.forEach((image) => {
    image.onload = imageLoaded;
  });
}

/**
 * set the health of mainBoss depending on level
 */
function setMainBossHealth() {
  switch (currentLevel) {
    case 1:
      mainBossHealth = 100;
      break;
    case 2:
      mainBossHealth = 300;
      break;
    case 3:
      mainBossHealth = 500;
  }
}
