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
  switch (currentLevel) {
    case 1:
      backgrounds = [
        new Background(-2, -2, backgroundImg),
        new Background(backgroundImg.width - 10, -2, backgroundImg),
        new Background(-1, -1, hills),
        new Background(hills.width, -1, hills),
      ];
      break;
    case 2:
      backgrounds = [
        new Background(-2, -2, backgroundImg2),
        new Background(backgroundImg2.width - 10, -2, backgroundImg2),
        new Background(backgroundImg2.width * 2 - 10, -2, backgroundImg2),
        new Background(700, 150, sun),
        new Background(-1, canvas.height - mountains.height, mountains),
        new Background(
          mountains.width,
          canvas.height - mountains.height,
          mountains
        ),
        new Background(mountains.width * 2, -1, mountains),
      ];
      break;
    case 3:
      backgrounds = [
        new Background(-2, -1, backgroundImg3),
        new Background(backgroundImg3.width - 10, -1, backgroundImg3),
        new Background(backgroundImg3.width * 2 - 10, -1, backgroundImg3),
        new Background(800, -30, sun),
        new Background(-1, canvas.height - hills3.height + 10, hills3),
        new Background(
          hills3.width,
          canvas.height - mountains.height,
          mountains3
        ),
        new Background(hills3.width + mountains3.width, -1, hills3),
      ];
      break;
    default:
      break;
  }
}
