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
    // ctx.fillText(this.text, this.position.x, this.position.y - 30);
    // ctx.fillText(this.position.y, this.position.x, this.position.y);
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
  switch (currentLevel) {
    case 1:
      flags = [
        // new Flag(
        //   500,
        //   canvas.height - lgPlatform.height - flagImg.height,
        //   flagImg
        // ),
        new Flag(
          8753 + lgPlatform.width - 100,
          canvas.height - lgPlatform.height - flagImg.height,
          flagImg,
          8753 + lgPlatform.width - 100
        ),
      ];
      break;
    case 2:
      flags = [
        // new Flag(
        //   500,
        //   canvas.height - lgPlatform.height - flagImg.height,
        //   flagImg,
        //   500
        // ),
        new Flag(
          11574 + 400,
          canvas.height - lgPlatform.height - flagImg.height,
          flagImg2,
          11974
        ),
      ];
      break;
    case 3:
      flags = [
        // new Flag(
        //   500,
        //   canvas.height - lgPlatform.height - flagImg.height,
        //   flag3,
        //   500
        // ),
        new Flag(
          14099 + lgPlatform3.width / 2 - 200,
          canvas.height - lgPlatform3.height - flag3.height,
          flag3,
          14099 + lgPlatform3.width - 200
        ),
      ];
      break;
  }
}
