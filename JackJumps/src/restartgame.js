function restartGame() {
  console.log("game restarted");
  console.log(backgroundImg);
  health = 100;
  coinsCollected = 0;
  // return;
  //resetting gold and health

  backgrounds = [];
  platforms = [];
  blocks = [];
  flowers = [];
  lifes = [];
  goombas = [];
  flags = [];
  coins = [];
  platformDistance = 0;
  particles = [];
  fireballs = [];

  //drawing backgorund
  initializeBackground();

  //drawing groundPlatform
  initializeMap();

  //drawing flower
  initializeFlower();

  //drawing block

  initializeBlock();

  //drawing goomba
  initializeGoomba();

  //drawing coin
  initializeCoin();

  //drawing life/health buff
  initializeLife();

  //drawing flag pole
  initializeFlag();

  //drawing player
  player = new Player();

  //drawing mainBoss
  initializeMainBoss();

  console.log("restart ended");
}
