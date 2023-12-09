/**
 * detects whether objA has collided with objB and viceversa
 * @param {object} objA
 * @param {object} objB
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
 * @param {path string} path
 * @returns {image object}
 */
function createImage(path) {
  let image = new Image();
  image.src = path;
  return image;
}

/**
 * return boolean if objectA has collided with objB vetically
 * @param {object} objA
 * @param {object} objB
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
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function generateRandomBetweenRange(min, max) {
  return Math.floor(min + (Math.random() * max - min));
}

/**
 * checks whether image has loaded or not
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
 * @param {object} image1
 * @param {function} callback
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
 * @param {object} player
 * @param {object} block
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
 * @param {object} player
 * @param {object} block
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
 * @param {object} player
 * @param {object} object can be either flower or coin
 * @returns
 */

function rectangularCollisionDetection(player, object) {
  return (
    player.position.x + player.width >= object.position.x &&
    player.position.x <= object.position.x + object.width &&
    player.position.y + player.height >= object.position.y &&
    player.position.y <= object.position.y + object.height
  );
}

function isOnTopOfPlatformCircle({ object, platform }) {
  return (
    object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  );
}
