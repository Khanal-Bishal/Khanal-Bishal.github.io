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
    // ctx.fillText(this.text, this.position.x, this.position.y - 30);
    // ctx.fillText(this.position.y, this.position.x, this.position.y);
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

let blocks = [];

switch (currentLevel) {
  case 1:
    initializeBlock();
    break;
  case 2:
    initializeBlock();
    break;
  case 3:
    initializeBlock();
    break;
  default:
    break;
}

/**
 * initalizes blocks
 */
function initializeBlock() {
  switch (currentLevel) {
    case 1:
      blocks = [
        new Block(
          lgPlatform.width + 100,
          250,
          singleBlock,
          lgPlatform.width + 100
        ),
        new Block(
          lgPlatform.width + 250,
          150,
          blockTri,
          lgPlatform.width + 150
        ),
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
        new Block(
          6730 + tPlatform.width,
          240,
          blockTri,
          6730 + tPlatform.width
        ),
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
        new Block(
          8302 + mdPlatform.width - 5,
          canvas.height - mdPlatform.height,
          lgPlatform,
          8302 + mdPlatform.width - 5
        ),
        new Block(
          8753 + lgPlatform.width,
          canvas.height - mdPlatform.height,
          lgPlatform,
          8302 + lgPlatform.width - 5
        ),
      ];
      break;

    case 2:
      blocks = [
        new Block(
          lgPlatform.width + 100,
          250,
          singleBlock2,
          lgPlatform.width + 100
        ),
        new Block(
          lgPlatform.width + 200 + 100,
          100,
          singleBlock2,
          lgPlatform.width + 100 + 200
        ),

        new Block(
          1514 + blockTri2.width + 400 + 300,
          100,
          singleBlock2,
          1514 + blockTri2.width + 400 + 300
        ),
        new Block(
          3117 + singleBlock2.width + 200,
          100,
          blockTri2,
          3117 + singleBlock2.width + 200
        ),
        new Block(
          4140 + xtPlatform2.width + 200,
          350,
          singleBlock2,
          4140 + xtPlatform2.width + 200
        ),
        new Block(
          4140 + xtPlatform2.width + 200,
          350,
          singleBlock2,
          4140 + xtPlatform2.width + 400
        ),
        new Block(
          5722 + xtPlatform.width + 300,
          350,
          singleBlock2,
          5722 + xtPlatform.width + 300
        ),
        new Block(6251 + 400, 350, singleBlock2, 6251 + 400),
      ];
      break;

    case 3:
      blocks = [
        new Block(
          lgPlatform.width + 200,
          500,
          singleBlock3,
          lgPlatform.width + 200
        ),
        new Block(1110 + 300, 500, singleBlock3, 1110 + 300),
        new Block(1110 + 600, 500, singleBlock3, 1100 + 600),
        new Block(
          1960 + tPlatform3.width + 250,
          150,
          singleBlock3,
          1960 + tPlatform3.width + 300
        ),
        new Block(
          1960 + tPlatform3.width + 600,
          350,
          singleBlock3,
          1960 + tPlatform3.width + 600
        ),
        new Block(2788 + 300, 250, singleBlock3, 2788 + 300),
        new Block(
          7101 + blockTri3.width + 250,
          220,
          singleBlock3,
          7101 + blockTri3.width + 250
        ),
        new Block(
          7503 + singleBlock3.width + 250,
          420,
          singleBlock3,
          7503 + singleBlock3.width + 250
        ),
      ];
  }
}
