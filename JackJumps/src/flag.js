/**
 * class to create blocks
 */
class Flag {
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
    ctx.fillText(this.text, this.position.x, this.position.y - 30);
    ctx.fillText(this.position.y, this.position.x, this.position.y);
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

let flags = [];

checkImageLoaded(flagImg, function () {
  initializeFlag();
});

/**
 * initializes instance of flag class and pushes to flags array
 */
function initializeFlag() {
  flags = [
    new Flag(
      8302 + mdPlatform.width - 100,
      //   500,
      canvas.height - lgPlatform.height - flagImg.height,
      flagImg,
      lgPlatform.width + 100
    ),
  ];
}
