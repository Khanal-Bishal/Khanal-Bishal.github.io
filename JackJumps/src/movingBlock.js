let movingBlocks = [];

class MovingBlock {
  constructor({
    position,
    velocity,
    distance,
    image,
    text,
    verticalMoveMent = false,
  }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.distance = distance;
    this.text = text;
    this.verticalMoveMent = verticalMoveMent;
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
    // console.log(this.position.x);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.distance.coveredDistance += this.velocity.x;
    if (
      Math.abs(this.distance.coveredDistance) >= Math.abs(this.distance.limit)
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.verticalMoveMent) {
      this.distance.coveredDistance += this.velocity.y;
      if (
        Math.abs(this.distance.coveredDistance) >= Math.abs(this.distance.limit)
      ) {
        this.velocity.y = -this.velocity.y;
      }
    }
  }
}

checkTwoImagesLoaded(singleBlock, blockTri, function () {
  initializeMovingBlock();
});

function initializeMovingBlock() {
  switch (currentLevel) {
    case 1:
      break;
    case 2:
      movingBlocks = [
        new MovingBlock({
          position: { x: 904 + lgPlatform.width, y: 250 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 300, coveredDistance: 0 },
          image: blockTri2,
          text: 904 + lgPlatform.width - 300,
        }),
        new MovingBlock({
          position: { x: 2862 + lgPlatform.width / 2 - 200, y: 200 },
          velocity: { x: 0, y: 2 },
          distance: { limit: 100, coveredDistance: 0 },
          image: singleBlock2,
          text: 2862 + lgPlatform.width / 2 - 200,
          verticalMoveMent: true,
        }),
        new MovingBlock({
          position: { x: 6451 + singleBlock2.width + 800, y: 250 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
          image: blockTri2,
          text: 6451 + singleBlock2.width + 800,
        }),
        new MovingBlock({
          position: { x: 7751 + xtPlatform.width + 300, y: 400 },
          velocity: { x: 6.5, y: 0 },
          distance: { limit: 250, coveredDistance: 0 },
          image: singleBlock2,
          text: 7751 + xtPlatform.width + 300,
        }),
        new MovingBlock({
          position: { x: 8736 + tPlatform.width + 300, y: 400 },
          velocity: { x: 4.5, y: 0 },
          distance: { limit: 250, coveredDistance: 0 },
          image: singleBlock2,
          text: 8736 + tPlatform.width + 300,
        }),
      ];
      break;

    case 3:
      movingBlocks = [
        new MovingBlock({
          position: { x: lgPlatform3.width + 400, y: 200 },
          velocity: { x: 2.5, y: 0 },
          distance: { limit: 450, coveredDistance: 0 },
          image: blockTri3,
          text: lgPlatform3.width + 400,
        }),
        new MovingBlock({
          position: { x: 3088 + 700, y: 200 },
          velocity: { x: 2.5, y: 0 },
          distance: { limit: 350, coveredDistance: 0 },
          image: blockTri3,
          text: 3088 + 700,
        }),
        new MovingBlock({
          position: { x: 6401 + mdPlatform3.width + 250, y: 350 },
          velocity: { x: 0, y: 3 },
          distance: { limit: 120, coveredDistance: 0 },
          image: blockTri3,
          text: 6401 + mdPlatform3.width + 250,
          verticalMoveMent: true,
        }),
        new MovingBlock({
          position: { x: 7804 + singleBlock3.width + 600, y: 300 },
          velocity: { x: 4, y: 0 },
          distance: { limit: 300, coveredDistance: 0 },
          image: singleBlock3,
          text: 7804 + singleBlock3.width + 250,
        }),
      ];
      break;
  }
}
