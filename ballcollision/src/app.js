//
let viewport = document.querySelector(".viewport");

const balls = [];

/**
 * create multiple number of balls(BALL_COUNT) and pushes it to ball array
 */
for (let i = 0; i < BALL_COUNT; i++) {
  let xCord = getRandom(RADIUS, VIEWPORT_WIDTH - BALL_WIDTH);
  let yCord = getRandom(RADIUS, VIEWPORT_HEIGHT - BALL_HEIGHT);
  if (xCord < 1 || yCord < 1) {
    xCord += 1;
    yCord += 1;
  }
  if (
    xCord == VIEWPORT_WIDTH - BALL_WIDTH ||
    yCord == VIEWPORT_HEIGHT - BALL_HEIGHT
  ) {
    xCord -= 1;
    yCord -= 1;
  }
  /**
   * makes sure that ball never spawn at same position
   */
  if (i != 0) {
    for (let j = 0; j < balls.length; j++) {
      if (
        getDistance(xCord, yCord, balls[j].xCord, balls[j].yCord) <
        RADIUS * 2
      ) {
        xCord = getRandom(RADIUS, VIEWPORT_WIDTH - BALL_WIDTH);
        yCord = getRandom(RADIUS, VIEWPORT_HEIGHT - BALL_HEIGHT);
        j = -1;
      }
    }
  }

  const ball = new Ball(xCord, yCord, RADIUS);

  balls.push(ball);
}

//draw every single ball on the viewport
balls.forEach((nextBall) => viewport.appendChild(nextBall.getElement()));

/**
 * performs all the ball related task including drawing moving and collision detection
 */
function render() {
  balls.forEach((nextBall) => {
    nextBall.checkCordinate();
    nextBall.draw();
    nextBall.move();
    nextBall.checkBoundaryCollision();

    balls.forEach((ball) => {
      if (nextBall == ball) return;
      let x1 = nextBall.getX();
      let y1 = nextBall.getY();
      let x2 = ball.getX();
      let y2 = ball.getY();

      nextBall.checkBallCollision(getDistance(x1, y1, x2, y2), ball);
      // nextBall.check(getDistance(x1, y1, x2, y2), nextBall,ball);
      // nextBall.resolveCollision(nextBall, ball);
      nextBall.checkCordinate();
    });
  });
  requestAnimationFrame(render);
}
render();
