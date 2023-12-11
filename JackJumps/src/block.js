/**
 * class to create blocks
 */
class Block {
  constructor(x, y, image, text) {
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
    this.text = text;
  }
  draw() {
    ctx.font = "30px serif";
    ctx.fillStyle = "black";
    ctx.fillText(this.text, this.position.x, this.position.y - 30);
    ctx.fillText(this.position.y, this.position.x, this.position.y);
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

let blocks = [];

checkTwoImagesLoaded(singleBlock, blockTri, function () {
  initializeBlock();
});

/**
 * initalizes blocks
 */
function initializeBlock() {
  blocks = [
    new Block(lgPlatform.width + 100, 250, singleBlock, lgPlatform.width + 100),
    new Block(lgPlatform.width + 250, 150, blockTri, lgPlatform.width + 150),
    new Block(1966 + 150, 250, singleBlock, 1966 + 100),
    new Block(
      2950 + xtPlatform.width + 200,
      280,
      singleBlock,
      2950 + xtPlatform.width + 200
    ),
    new Block(
      4385 + lgPlatform.width / 2 + 100,
      245,
      blockTri,
      4385 + lgPlatform.width / 2 + 100
    ),
    new Block(
      4385 + lgPlatform.width / 2 + 500,
      210,
      singleBlock,
      4385 + lgPlatform.width / 2 + 300
    ),
    new Block(6730 + tPlatform.width, 240, blockTri, 6730 + tPlatform.width),
    new Block(
      6730 + tPlatform.width + 300,
      150,
      singleBlock,
      6730 + tPlatform.width + 300
    ),
    new Block(
      6730 + tPlatform.width + 450,
      150,
      singleBlock,
      6730 + tPlatform.width + 450
    ),
    new Block(
      6730 + tPlatform.width + 600,
      150,
      singleBlock,
      6730 + tPlatform.width + 600
    ),
    new Block(
      6730 + tPlatform.width + 800,
      260,
      blockTri,
      6730 + tPlatform.width + 800
    ),
    new Block(
      7750 + blockTri.width + 400,
      canvas.height - mdPlatform.height,
      mdPlatform,
      7750 + blockTri.width + 400
    ),
  ];
}
