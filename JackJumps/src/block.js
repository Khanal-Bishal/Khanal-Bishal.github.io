const blockTri = createImage("../img/blockTri.png");
const singleBlock = createImage("../img/block.png");

/**
 * class to create blocks
 */
class Block {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    this.width = image.width;
    this.height = image.height;
    this.image = image;
    console.log(this.width, this.height);
    this.velocity = {
      x: 0,
      y: 0,
    };
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

let blocks = [];

checkTwoImagesLoaded(singleBlock, blockTri, function () {
  blocks = [
    // new Block(100, 300, singleBlock),
    new Block(400, 300, blockTri),
    new Block(1000, 200, singleBlock),
    new Block(1500, 200, blockTri),
    new Block(1500, 200, blockTri),
    new Block(lgPlatform.width * 3 - 75, 300, blockTri),
    new Block(lgPlatform.width * 2 - 75, 300, blockTri),
    new Block(lgPlatform.width * 4, 300, blockTri),
    new Block(lgPlatform.width * 4 - 200, 350, singleBlock),
  ];
});
