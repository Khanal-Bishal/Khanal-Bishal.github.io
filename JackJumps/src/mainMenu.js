const newGameBtn = document.querySelector(".newGameBtn");
const loadGameBtn = document.querySelector(".loadGameBtn");
const levelsBtn = document.querySelector(".levelsBtn");
const helpBtn = document.querySelector(".helpBtn");
const body = document.querySelector("body");

const menuContainer = document.querySelector(".menu_container");
const mainCanvas = document.querySelector("#canvas");
const levels = document.querySelector(".levels");
const help = document.querySelector(".help");

const backIcon = document.querySelector(".back-icon");
const helpBackIcon = document.querySelector(".back-icon-help");

//new game btn
newGameBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  mainCanvas.style.display = "block";

  body.style.backgroundImage = "url('img/background.png')";
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
