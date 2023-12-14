/**
 * Platform class
 */
class Platform {
  constructor(x, y, image = lgPlatform, text) {
    this.position = {
      x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = 20;
    this.text = text;

    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
    if (this.text) {
      ctx.font = "30px  serif";
      ctx.fillStyle = "red";
      // ctx.fillText(this.text, this.position.x, this.position.y);
    }
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
  }
}

let platforms = [];
let platformDistance = 0;
let platformMap = [];

function initializePlatform() {
  switch (currentLevel) {
    case 1:
      platformMap = [
        "lg",
        "lg",
        "gap",
        "md",
        "gap",
        "t",
        "gap",
        "xt",
        "gap",
        "gap",
        "smallTall",
        "gap",
        "gap",
        "md",
        "gap",
        "lg",
        "gap",
        "gap",
        "xt",
        "gap",
        "xt",
        "gap",
        "xt",
        "gap",
        "t",
      ];
      break;
    case 2: {
      platformMap = [
        "lg",
        "lg",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "lg",
        "t",
        "gap",
        "xt",
        "gap",
        "gap",
        "gap",
        "gap",
        "md",
        "gap",
        "gap",
        "xt",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "xt",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "t",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "gap",
        "xt",
        "gap",
        "md",
        "lg",
        "lg",
      ];
    }
  }
}

checkTwoImagesLoaded(lgPlatform, mdPlatform2, function () {
  initializeMap();

  console.log("From level 2 blocks" + blocks);
});

function initializeMap() {
  initializePlatform();

  switch (currentLevel) {
    case 1:
      platformMap.forEach((symbol) => {
        switch (symbol) {
          case "lg":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - lgPlatform.height,
                lgPlatform,
                (text = platformDistance)
              )
            );
            platformDistance += lgPlatform.width - 2;
            break;

          case "gap":
            platformDistance += 150;
            break;

          case "md":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - mdPlatform.height,
                mdPlatform,
                (text = platformDistance)
              )
            );
            platformDistance += mdPlatform.width;
            break;

          case "xt":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - xtPlatform.height,
                xtPlatform,
                (text = platformDistance)
              )
            );
            platformDistance += xtPlatform.width;
            break;

          case "t":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - tPlatform.height,
                tPlatform,
                (text = platformDistance)
              )
            );
            platformDistance += tPlatform.width;
            break;
        }
      });
      break;

    case 2:
      platformMap.forEach((symbol) => {
        switch (symbol) {
          case "lg":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - lgPlatform2.height,
                lgPlatform2,
                (text = platformDistance)
              )
            );
            platformDistance += lgPlatform2.width;
            break;

          case "gap":
            platformDistance += 150;
            break;

          case "md":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - mdPlatform2.height,
                mdPlatform2,
                (text = platformDistance)
              )
            );
            platformDistance += mdPlatform2.width;
            break;
          case "xt":
            platforms.push(
              new Platform(
                platformDistance,
                canvas.height - xtPlatform2.height,
                xtPlatform2,
                (text = platformDistance)
              )
            );
            platformDistance += xtPlatform2.width;
            break;

          case "t":
            platforms.push(
              new Platform(
                platformDistance - 5,
                canvas.height - tPlatform2.height,
                tPlatform2,
                (text = platformDistance)
              )
            );
            platformDistance += tPlatform2.width;
            break;
        }
      });
      break;
  }
}

// }

// initializePlatform();
