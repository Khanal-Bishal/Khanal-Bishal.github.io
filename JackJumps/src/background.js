/**
 * Background class
 *
 */
class Background {
  constructor(x, y, image) {
    // this.position = {
    //   x,
    //   y,
    // };

    // this.velocity = {
    //   x: 0,
    //   y: 0,
    // };
    // this.image = image;
    this.initialize(x, y, image);
  }

  initialize(x, y, image) {
    this.position = {
      x,
      y,
    };

    this.velocity = {
      x: 0,
      y: 0,
    };
    this.image = image;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}
let backgrounds = [];

checkTwoImagesLoaded(backgroundImg, hills, function () {
  initializeBackground();
});

function initializeBackground() {
  backgrounds = [
    new Background(-2, -2, backgroundImg),
    new Background(backgroundImg.width - 10, -2, backgroundImg),
    new Background(-1, -1, hills),
    new Background(hills.width, -1, hills),
  ];
}
