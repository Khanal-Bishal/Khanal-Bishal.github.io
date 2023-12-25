class Coin {
  constructor({ position, velocity }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: 0,
      y: velocity.y,
    };

    this.width = 45;
    this.height = 50;
    this.image = coinImg;
    this.frames = 0;
  }
  draw() {
    ctx.drawImage(
      this.image, //image src
      125 * this.frames, //x-axis crop cords
      5, //y-axis crop cords
      125, // width for crop
      120, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    // tempFrameVariable++;
    // if (tempFrameVariable % 3 == 0) {
    this.frames += 1;
    // }

    if (this.frames >= 6) {
      this.frames = 0;
    }
    this.draw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
  }
}

coinImg.onload = () => {
  initializeCoin();
};

/**
 * initializes instance of coin class and pushes it to coins array
 */
function initializeCoin() {
  switch (currentLevel) {
    case 1:
      coins = [
        new Coin({
          position: { x: 1010 + 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 908 + lgPlatform.width - 200, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 908 + lgPlatform.width - 150, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 908 + lgPlatform.width - 100, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 908 + lgPlatform.width - 50, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2572 + tPlatform.width / 2 - 100, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2572 + tPlatform.width / 2 - 50, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2950 + xtPlatform.width - 50, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2950 + xtPlatform.width - 100, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4940 + 150, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4940 + 200, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 6351 + 50, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 6351 + 100, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 6351 + 150, y: 100 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;
    case 2:
      coins = [
        new Coin({
          position: { x: 906 - 50, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 906, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 906 + 200, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 906 + 250, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 1220, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2406, y: 0 },
          velocity: { x: 0, y: 0 },
        }),

        new Coin({
          position: { x: 2862 + 100 + singleBlock2.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2862 + 150 + singleBlock2.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 2862 + 200 + singleBlock2.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 3438 + singleBlock2.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 3488 + singleBlock2.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4975 + 150, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4975 + 200, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4975 + 250, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 4975 + 300, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 7757 + 20, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 7757 + 70, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 8736 + 50, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 8736 + 100, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10243 + mdPlatform2.width / 2, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10243 + mdPlatform2.width / 2 + 50, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10243 + mdPlatform2.width / 2 + 100, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10696 + lgPlatform2.width / 2, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10696 + lgPlatform2.width / 2 + 50, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10696 + lgPlatform2.width / 2 + 100, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 10696 + lgPlatform2.width / 2 + 150, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
      ];
      break;

    case 3:
      coins = [
        new Coin({
          position: { x: 1110 + singleBlock3.width / 2 - 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 1700 + singleBlock3.width / 2 + 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 1960, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 1960 + 100, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 1960 + 200, y: 0 },
          velocity: { x: 0, y: 0 },
        }),

        new Coin({
          position: { x: 3088 + singleBlock3.width / 2 + 20, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 5344 + 20, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 5344 + 120, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 8957 + 20, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 8957 + 90, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 10, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 80, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 150, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 220, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 290, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 360, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
        new Coin({
          position: { x: 11523 + 430, y: 0 },
          velocity: { x: 0, y: 0 },
        }),
      ];
  }
}
