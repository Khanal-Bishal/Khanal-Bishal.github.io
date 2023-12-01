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
balls.forEach((singleBall) => viewport.appendChild(singleBall.getElement()));

/**
 * performs all the ball related task including drawing moving and collision detection
 */
function render() {
  balls.forEach((singleBall) => {
    singleBall.checkCordinate();
    singleBall.draw();
    singleBall.move();
    singleBall.checkBoundaryCollision();

    balls.forEach((ball) => {
      if (singleBall == ball) return;
      let x1 = singleBall.getX();
      let y1 = singleBall.getY();
      let x2 = ball.getX();
      let y2 = ball.getY();

      singleBall.checkBallCollision(getDistance(x1, y1, x2, y2), ball);
      // singleBall.check(getDistance(x1, y1, x2, y2), singleBall,ball);
      // singleBall.resolveCollision(singleBall, ball);
      singleBall.checkCordinate();
    });
  });
  requestAnimationFrame(render);
}
render();
