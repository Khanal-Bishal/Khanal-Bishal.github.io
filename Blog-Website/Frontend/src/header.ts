//constants and variables
const blogsContainer = document.querySelector(
  ".blogs-container"
) as HTMLElement;
const randomBlogContainer = document.querySelector(
  ".random-blog-container"
) as HTMLElement;
const userNameContainer = document.querySelector(
  ".username-container"
) as HTMLParagraphElement;
const loginContainer = document.querySelector(
  ".login-container"
) as HTMLParagraphElement;
const logoutContainer = document.querySelector(
  ".logout-container"
) as HTMLParagraphElement;
const signupContainer = document.querySelector(
  ".signup-container"
) as HTMLParagraphElement;
const personIcon = document.querySelector(
  ".person-icon"
) as HTMLParagraphElement;
const closeIcon = document.querySelector(".x-icon") as HTMLElement;
const menuOpener = document.querySelector(".menu-opener") as HTMLElement;
const menuIcon = document.querySelector(".menu-icon") as HTMLElement;
const userName = document.querySelector(".user-name") as HTMLElement;

window.addEventListener("load", () => {
  const storedUserInfo = localStorage.getItem("userInfo") as string;
  const userInfo = JSON.parse(storedUserInfo);

  if (!userInfo?.userName) {
    personIcon.style.display = "none";
    userNameContainer.innerText = "";
  }
  if (userInfo?.userName) {
    personIcon.style.display = "block";
    userNameContainer.innerText = userInfo.userName;
  }
  if (userInfo)
    logoutContainer.innerHTML = `<i class="logout-container fa-solid fa-right-from-bracket"></i>`;
  if (!userInfo) loginContainer.innerText = "Login";
  if (!userInfo) signupContainer.innerText = "Register";
});

closeIcon.addEventListener("click", () => {
  menuOpener.style.display = "none";
});

menuIcon.addEventListener("click", () => {
  const storedUserInfo = localStorage.getItem("userInfo") as string;
  const userInfo = JSON.parse(storedUserInfo);

  if (!userInfo?.userName) {
    userName.innerText = "";
  }
  if (userInfo?.userName) {
    userName.innerText = userInfo.userName;
  }
  menuOpener.style.display = "block";
});

//event for logging
logoutContainer.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.removeItem("userInfo");

  setTimeout(() => {
    window.location.reload();
  }, 200);
});
