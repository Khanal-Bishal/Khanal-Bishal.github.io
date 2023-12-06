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
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}

let platforms = [];

lgPlatform.onload = () => {
  platforms = [
    new Platform(0, 500, lgPlatform),
    new Platform(lgPlatform.width, 220, lgPlatform),
    new Platform(lgPlatform.width * 2, 220, lgPlatform),
    new Platform(lgPlatform.width * 3 + 100, 220, lgPlatform),
  ];
};
