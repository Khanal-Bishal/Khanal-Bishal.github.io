/**
 * detects whether objA has collided with objB and viceversa
 * @returns boolean
 * @param {object} objA
 * @param {object} objB
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
 * @returns {image object}
 * @param {path string} path
 */
function createImage(path) {
  let image = new Image();
  image.src = path;
  return image;
}
