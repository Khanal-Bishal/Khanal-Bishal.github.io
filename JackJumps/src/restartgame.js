function restartGame() {
  console.log("game restarted");
  //background redrawing

  checkTwoImagesLoaded(backgroundImg, hills, function () {
    backgrounds = [
      new Background(-2, -2, backgroundImg),
      new Background(backgroundImg.width - 10, -2, backgroundImg),
      new Background(-1, -1, hills),
      new Background(hills.width, -1, hills),
    ];
  });

  //block redrawing
  checkTwoImagesLoaded(singleBlock, blockTri, function () {
    blocks = [
      new Block(100, 300, singleBlock),
      new Block(400, 350, blockTri),
      new Block(1000, 200, singleBlock),
      new Block(1500, 200, blockTri),
      new Block(1500, 200, blockTri),
      new Block(lgPlatform.width * 3 - 75, 300, blockTri),
      new Block(lgPlatform.width * 2 - 75, 300, blockTri),
      new Block(lgPlatform.width * 4, 300, blockTri),
      new Block(lgPlatform.width * 4 - 200, 350, singleBlock),
    ];
  });

  //lgPlatform redrawing
  checkImageLoaded(lgPlatform, function () {
    platforms = [
      new Platform(0, 500, lgPlatform),
      new Platform(lgPlatform.width, 220, lgPlatform),
      new Platform(lgPlatform.width * 2, 220, lgPlatform),
      new Platform(lgPlatform.width * 3 + 100, 220, lgPlatform),
      new Platform(lgPlatform.width * 4 + 400, 220, lgPlatform),
      new Platform(lgPlatform.width * 5 + 1000, 220, lgPlatform),
    ];
  });

  let player = new Player();
}
