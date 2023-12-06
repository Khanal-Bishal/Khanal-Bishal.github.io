const blockTri = createImage("../");
class Block {
  constructor(x, y, width, height) {
    this.position = {
      x,
      y,
    };
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

let blocks = [];
blocks = [
  new Block(100, 300, 100, 20),
  new Block(400, 350, 100, 20),
  new Block(1000, 200, 100, 20),
  new Block(1500, 200, 100, 40),
];
