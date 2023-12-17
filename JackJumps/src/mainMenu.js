const newGameBtn = document.querySelector(".newGameBtn");
const loadGameBtn = document.querySelector(".loadGameBtn");
const levelsBtn = document.querySelector(".levelsBtn");
const helpBtn = document.querySelector(".helpBtn");
const body = document.querySelector("body");
const storyBtn = document.querySelector(".storyBtn");

const menuContainer = document.querySelector(".menu_container");
const mainCanvas = document.querySelector("#canvas");
const levels = document.querySelector(".levels");
const help = document.querySelector(".help");
const storyContainer = document.querySelector(".story");

const backIcon = document.querySelector(".back-icon");
const helpBackIcon = document.querySelector(".back-icon-help");
const storyBackIcon = document.querySelector(".story-back-icon");

const level1Btn = document.querySelector(".level1-btn");
const level2Btn = document.querySelector(".level2-btn");
const level3Btn = document.querySelector(".level3-btn");

const pause = document.querySelector(".pause");
const continueBtn = document.querySelector(".pause-continue");
const restartBtn = document.querySelector(".pause-restart");
const mainMenuBtn = document.querySelector(".pause-mainMenu");

const winContainer = document.querySelector(".winning-screen");
const goHome = document.querySelector(".win-mainMenu");

// ----------------main menu buttons----------------
//new game btn
newGameBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";
  currentLevel = 1;
  selectLevel(currentLevel);
  showPause = true;
  body.style.backgroundImage = "url('img/background.png')";
  progressBar.style.display = "block";
  localStorage.removeItem("level");
  progressBar.value = 100;
  health = 100;
});

//levels btn
levelsBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  levels.style.display = "block";
});

//back icon on levels
backIcon.addEventListener("click", () => {
  console.log("back btn clicked");
  levels.style.display = "none";
  menuContainer.style.display = "flex";
});

//back icon on levels
helpBackIcon.addEventListener("click", () => {
  console.log("back btn clicked");
  help.style.display = "none";
  menuContainer.style.display = "flex";
});

//help btn
helpBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  help.style.display = "block";
});

//------------------levels button--------------

//level-1-btn
level1Btn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";
  levels.style.display = "none";
  currentLevel = 1;
  selectLevel(currentLevel);
  body.style.backgroundImage = "url('img/background.png')";
  progressBar.style.display = "block";
  showPause = true;
  progressBar.value = 100;
  health = 100;
});

//level-2-btn
level2Btn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";
  showPause = true;
  levels.style.display = "none";
  body.style.backgroundImage = "url('img/level2/background.png')";
  progressBar.style.display = "block";

  currentLevel = 2;
  selectLevel(currentLevel);
  progressBar.value = 100;
  health = 100;
});

//level-3-btn
level3Btn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";
  showPause = true;
  levels.style.display = "none";
  body.style.backgroundImage = "url('img/level3/background.png')";
  progressBar.style.display = "block";

  currentLevel = 3;
  selectLevel(currentLevel);
  progressBar.value = 100;
  health = 100;
});

//------------------pause functionality---------

//main menu btn
mainMenuBtn.addEventListener("click", () => {
  pause.style.display = "none";
  menuContainer.style.display = "flex";
  mainCanvas.style.display = "none";
  pauseCanvas = false;
  showPause = false;
  disableUserInput = false;
  body.style.backgroundImage = "url('img/bluemoon.png')";
  progressBar.style.display = "none";
});

//win screen main menu btn
goHome.addEventListener("click", () => {
  menuContainer.style.display = "flex";
  winContainer.style.display = "none";
  mainCanvas.style.display = "none";
  pauseCanvas = false;
  showPause = false;
  disableUserInput = false;
  currentLevel = 1;
  body.style.backgroundImage = "url('img/bluemoon.png')";
  localStorage.removeItem("level");
  progressBar.style.display = "none";
});

//continue btn
continueBtn.addEventListener("click", () => {
  pause.style.display = "none";
  disableUserInput = false;
  pauseCanvas = false;
});

//restart btn
restartBtn.addEventListener("click", () => {
  pause.style.display = "none";
  selectLevel(currentLevel);
  disableUserInput = false;
  pauseCanvas = false;
  progressBar.value = 100;
  health = 100;
});

//-------------- story --------------
//story btn
storyBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  storyContainer.style.display = "block";
});

storyBackIcon.addEventListener("click", () => {
  menuContainer.style.display = "flex";
  storyContainer.style.display = "none";
});

//load game btn
loadGameBtn.addEventListener("click", () => {
  let levelStoredData = localStorage.getItem("level");
  let levelData = JSON.parse(levelStoredData);
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";
  currentLevel = levelData?.level ? levelData.level : 1;
  selectLevel(currentLevel);
  showPause = true;
  progressBar.style.display = "block";
  progressBar.value = 100;
  health = 100;

  switch (currentLevel) {
    case 1:
      body.style.backgroundImage = "url(img/background.png)";
      break;
    case 2:
      body.style.backgroundImage = "url(img/level2/background.png)";
      break;
    case 3:
      body.style.backgroundImage = "url(img/level3/background.png)";
      break;
    default:
      break;
  }
});
