let goombas = [];

class Goomba {
  constructor({ position, velocity, distance }) {
    this.position = {
      x: position.x,
      y: position.y,
    };

    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };

    this.width = 45;
    this.height = 50;
    this.image = spriteGoomba;
    this.frames = 0;
    this.distance = distance;
  }
  draw() {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    ctx.drawImage(
      this.image, //image src
      130 * this.frames, //x-axis crop cords
      0, //y-axis crop cords
      130, // width for crop
      150, // height for crop
      this.position.x, // x cords
      this.position.y, // y cords
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames >= 58) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.velocity.y + this.height <= canvas.height) {
      this.velocity.y += GRAVITY;
    }
    this.distance.coveredDistance += this.velocity.x;
    if (
      Math.abs(this.distance.coveredDistance) >= Math.abs(this.distance.limit)
    ) {
      this.velocity.x = -this.velocity.x;
    }
  }
}

spriteGoomba.onload = () => {
  initializeGoomba();
};

function initializeGoomba() {
  switch (currentLevel) {
    case 1:
      goombas = [
        new Goomba({
          position: { x: 908 + lgPlatform.width - 250, y: 0 },
          velocity: { x: -0.4, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 908 + lgPlatform.width - 250 - 50, y: 0 },
          velocity: { x: -0.4, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 1966 + lgPlatform.width / 2 - 250, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 1966 + lgPlatform.width / 2 - 250 - 50, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 1966 + lgPlatform.width / 2 - 250 - 100, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 3000, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 80, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 3779 + mdPlatform.width / 2 - 100, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 3779 + mdPlatform.width / 2 - 100 - 50, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 80, coveredDistance: 0 },
        }),

        new Goomba({
          position: { x: 4385 + lgPlatform.width / 2, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4385 + lgPlatform.width / 2 - 50, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4385 + lgPlatform.width / 2 - 100, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4385 + lgPlatform.width / 2 - 150, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4385 + lgPlatform.width / 2 - 200, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5593 + 100, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5593 + 150, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5972 + 150, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6958 + 150, y: 0 },
          velocity: { x: -0.2, y: 0 },
          distance: { limit: 20, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 7758 + 150, y: 0 },
          velocity: { x: -0.2, y: 0 },
          distance: { limit: 20, coveredDistance: 0 },
        }),
      ];
      break;
    case 2:
      goombas = [
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 500, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 450, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 400, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 350, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 300, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 906 + lgPlatform2.width - 250, y: 0 },
          velocity: { x: -0.9, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 2862 + 400, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 2862 + 500, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 2862 + 600, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 2862 + 700, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 200, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 3768 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 3768 + 50, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4146 + 50, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4146 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4146 + 150, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5728 + 50, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5728 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5728 + 150, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 7757 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 8736 + 60, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 8736 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + 100, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + 150, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + lgPlatform.width / 2, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + lgPlatform.width / 2 + 50, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + lgPlatform.width, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 10243 + lgPlatform.width + 50, y: 0 },
          velocity: { x: 2, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
      ];
      break;
    case 3:
      goombas = [
        new Goomba({
          position: { x: lgPlatform3.width - 300, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: lgPlatform3.width - 250, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 1410 + 10, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: singleBlock3.width / 2, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4438 + mdPlatform3.width / 2, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: mdPlatform3.width / 2, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4438 + mdPlatform3.width / 2 - 50, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: mdPlatform3.width / 2 - 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 4438 + mdPlatform3.width / 2 - 100, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: mdPlatform3.width / 2 - 100, coveredDistance: 0 },
        }),

        new Goomba({
          position: { x: 5344 + 100, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5344 + 150, y: 0 },
          velocity: { x: 1.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),

        new Goomba({
          position: { x: 5872 + 50, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5872 + 100, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 5872 + 150, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 50, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6500, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6550, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6600, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6650, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 6650, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 50, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 100, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 150, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 200, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 250, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 300, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 350, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 400, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 450, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 550, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 600, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 650, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 700, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 750, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 9785 + 800, y: 0 },
          velocity: { x: 2.9, y: 0 },
          distance: { limit: 100, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 400, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 500, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 600, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 700, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 800, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
        new Goomba({
          position: { x: 12279 + 900, y: 0 },
          velocity: { x: 10.9, y: 0 },
          distance: { limit: 400, coveredDistance: 0 },
        }),
      ];
      break;
  }
}
