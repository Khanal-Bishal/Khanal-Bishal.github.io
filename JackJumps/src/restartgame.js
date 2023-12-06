function restartGame() {
  lgPlatform.onload = () => {
    platforms = [
      new Platform(0, 500, lgPlatform),
      new Platform(lgPlatform.width, 220, lgPlatform),
      new Platform(lgPlatform.width * 2, 220, lgPlatform),
      new Platform(lgPlatform.width * 3 + 100, 220, lgPlatform),
    ];
  };

  backgrounds = [
    new Background(-2, -2, backgroundImg),
    new Background(backgroundImg.width - 10, -2, backgroundImg),
    new Background(-1, -1, hills),
    new Background(hills.width, -1, hills),
  ];
  player = new Player(50, 50, 50, 50);
}
