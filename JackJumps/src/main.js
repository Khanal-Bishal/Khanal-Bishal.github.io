/**
 * runs our game loop
 * @returns {}
 * @param {}
 *
 */

function animate() {
  audioMusicLevel1.play();
  audioMusicLevel1.volume = 0.1;

  game();
  setTimeout(() => {
    requestAnimationFrame(animate); //running game loop here with  recursion
  }, 1000 / fps);
}

animate();
