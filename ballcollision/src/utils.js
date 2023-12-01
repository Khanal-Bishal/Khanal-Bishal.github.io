/**
 * return random number between defined range
 * @param {number} min
 * @param {number} max
 * @returns number
 *
 */
const getRandom = (min, max) => {
  return min + Math.random() * (max - min);
};

/**
 * return distance between two balls
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
const getDistance = (x1, y1, x2, y2) => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

/**
 * generates random color
 */
const randomColorGenerator = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const alpha = Math.random();

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};
