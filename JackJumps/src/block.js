const blockTri = createImage("../img/blockTri.png");
const singleBlock = createImage("../img/block.png");
class Block {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

let blocks = [];
blocks = [
  new Block(100, 300, singleBlock),
  new Block(400, 350, blockTri),
  new Block(1000, 200, singleBlock),
  new Block(1500, 200, blockTri),
  new Block(lgPlatform.width * 3 - 75, 300, blockTri),
  new Block(lgPlatform.width * 4, 300, blockTri),
  new Block(lgPlatform.width * 4 - 200, 350, singleBlock),
];
