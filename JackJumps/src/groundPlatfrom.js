//creating images
const lgPlatform = createImage("../img/lgPlatform.png");
console.log(lgPlatform);

/**
 * Platform class
 */
class Platform {
  constructor(x, y, image = lgPlatform) {
    this.position = {
      x,
      y: 500,
    };
    this.image = image;
    this.width = image.width;
    this.height = 20;

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

let platforms = [];

checkImageLoaded(lgPlatform, function () {
  platforms = [
    new Platform(0, 500, lgPlatform),
    new Platform(lgPlatform.width, 220, lgPlatform),
    new Platform(lgPlatform.width * 2, 220, lgPlatform),
    new Platform(lgPlatform.width * 3 + 100, 220, lgPlatform),
    new Platform(lgPlatform.width * 4 + 400, 220, lgPlatform),
    new Platform(lgPlatform.width * 5 + 1000, 220, lgPlatform),
  ];
});
