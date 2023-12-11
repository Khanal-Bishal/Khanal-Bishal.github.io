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

  backgrounds = [
    new Background(-2, -2, backgroundImg),
    new Background(backgroundImg.width - 10, -2, backgroundImg),
    new Background(-1, -1, hills),
    new Background(hills.width, -1, hills),
  ];

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
  player.initialize();

  console.log("restart ended");
}
