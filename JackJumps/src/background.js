const backgroundImg = createImage("../img/background.png");
const hills = createImage("../img/hills.png");

/**
 * Background class
 *
 */
class Background {
  constructor(x, y, image) {
    this.position = {
      x,
      y,
    };
    // this.width = width;
    // this.height = height;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
let backgrounds = [];

backgrounds = [
  new Background(-2, -2, backgroundImg),
  new Background(backgroundImg.width - 10, -2, backgroundImg),
  new Background(-1, -1, hills),
  new Background(hills.width, -1, hills),
];
