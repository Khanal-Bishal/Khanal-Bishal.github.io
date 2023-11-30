//<----------variables and constants----------------------- >
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide img");

//Buttons
const previousBtn = document.querySelector("#previousBtn");
const nextBtn = document.querySelector("#nextBtn");

//indicator
const firstImgPointer = document.querySelector(".indicator__1");
const secondImgPointer = document.querySelector(".indicator__2");
const thirdImgPointer = document.querySelector(".indicator__3");

//Counter
let counter = 1;
const size = carouselImages[1].clientWidth;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

//<-------------events and function---------------------------------->
//next btn
nextBtn.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.2s ease-in-out";
  setTimeout(() => {
    counter++;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }, 1000);
});

//prev btn
previousBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.8s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

//looping images
carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

// image slide after interval
const slideImage = setInterval(() => {
  if (counter >= carouselImages.length - 1) {
    counter = -1;
  }

  carouselSlide.style.transition = "transform 1s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
}, 3000);

//utility function for point number
const point = (pointer) => {
  const pointerInterval = setTimeout(() => {
    counter = pointer;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }, 2000 / 60);
};

//firstImgPointer
firstImgPointer.addEventListener("click", () => {
  point(1);
});

secondImgPointer.addEventListener("click", () => {
  point(2);
});

thirdImgPointer.addEventListener("click", () => {
  point(3);
});
