/**
 * restarts the game by invoking initalize function
 */
function restartGame() {
  health = 100;
  coinsCollected = 0;
  progressBar.value = 100;

  initializeLevel();
  console.log(canvas.width);
}
