/**
 * Ball class
 */
class Ball {
  constructor(xCord, yCord, radius) {
    this.xCord = xCord;
    this.yCord = yCord;
    this.radius = radius;
    this.diameter = RADIUS * 2;

    this.xSpeed = getRandom(SPEED, -SPEED);
    this.ySpeed = getRandom(SPEED, -SPEED);

    this.element = document.createElement("div");
    this.element.classList.add("ball");
    console.log(randomColorGenerator());
    this.element.style.backgroundColor = randomColorGenerator();
  }

  /**
   * returns our created HTML element
   * @returns {HTMLelement}
   */
  getElement = () => {
    return this.element;
  };

  /**
   * returns the x-coordinate
   * @returns {number}
   */
  getX = () => {
    return this.xCord;
  };

  /**
   * returns the y-coordinate
   * @returns {number}
   */
  getY = () => {
    return this.yCord;
  };

  /**
   * return the radius of the ball
   * @returns {number}
   */
  getRadius = () => {
    return this.radius;
  };

  /**
   * set the position of x cordinate
   * @param {number}
   */
  setX = (xCord) => {
    this.xCord = xCord;
  };

  /**
   * set the position of y cordinate
   * @param {number}
   */
  setY = (yCord) => {
    this.yCord = yCord;
  };

  /**
   * set the radius of ball
   * @param {number}
   */
  setRadius = (radius) => {
    this.radius = radius;
  };
  /**
   * move the balls by xSpeed-px and ySpeed-px
   */
  move = () => {
    this.xCord += this.xSpeed;
    this.yCord += this.ySpeed;
  };

  /**
   *draw the balls into our viewport
   */
  draw = () => {
    this.element.style.left = `${this.getX()}px`;
    this.element.style.top = `${this.getY()}px`;
  };

  /**
   * checks and detects the collision of the ball with the wall
   *
   */
  checkBoundaryCollision = () => {
    let xCord = this.getX();
    let yCord = this.getY();
    let maxHeigth = VIEWPORT_HEIGHT - BALL_HEIGHT;

    if (xCord - RADIUS <= 0 || xCord + BALL_WIDTH >= VIEWPORT_WIDTH) {
      this.xSpeed = -this.xSpeed;
      this.element.style.backgroundColor = randomColorGenerator();
    }

    if (yCord - RADIUS <= 0 || yCord >= maxHeigth) {
      this.ySpeed = -this.ySpeed;
      this.element.style.backgroundColor = randomColorGenerator();
    }
  };

  /**
   * checks for the ball collision
   * @param {number} distance
   * @param {object} ball
   */
  // checkBallCollision = (distance, ball) => {
  //   if (this.radius * 2 > distance) {
  //     this.xSpeed = -this.xSpeed;
  //     this.ySpeed = -this.ySpeed;
  //     ball.xSpeed = -ball.xSpeed;
  //     ball.ySpeed = -ball.ySpeed;
  //   }
  // };

  checkBallCollision = (distance, ball) => {
    if (
      ball.xCord <= this.xCord + this.diameter &&
      ball.xCord + ball.diameter >= this.xCord &&
      ball.yCord <= this.yCord + this.diameter &&
      ball.yCord + ball.diameter >= this.yCord
    ) {
      if (Math.abs(this.x - ball.xCord) > Math.abs(this.y - ball.yCord)) {
        ball.xSpeed *= -1;
      } else {
        ball.ySpeed *= -1;
      }
    }
  };

  /**
   * check coords for indivisual ball and pushes them by its -ve x and y velocity
   */
  checkCordinate() {
    let maxHeigth = VIEWPORT_HEIGHT - BALL_HEIGHT;
    if (this.xCord - RADIUS < 0) {
      this.xSpeed = -this.xSpeed;
    }

    if (this.yCord - RADIUS < 0) {
      this.ySpeed = -this.ySpeed;
    }

    if (this.xCord + BALL_WIDTH >= VIEWPORT_WIDTH) {
      // this.xCord = this.xCord - BALL_WIDTH;
      this.xSpeed = -this.xSpeed;
    }

    if (this.yCord >= maxHeigth) {
      // this.yCord = this.yCord - BALL_WIDTH;
      this.ySpeed = -this.ySpeed;
    }
  }
}
