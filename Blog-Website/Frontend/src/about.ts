import HTTP from "./urlConfig";

// variables and constants
const mugshotContainer = document.querySelector(".mugshot-container") as HTMLElement;
const aboutContainer = document.querySelector(".aboutme-container") as HTMLElement;
const emailContainer = document.querySelector(".email-container") as HTMLElement;
const numberContainer = document.querySelector(".number-container") as HTMLElement;
const educationContainer = document.querySelector(".education-container") as HTMLElement;

//event listner
window.addEventListener("load", async (event) => {
  event.preventDefault();
  const result = await HTTP.get("/aboutme");
  const aboutMeInfo = result.data.data[0];
  console.log(aboutMeInfo);

  mugshotContainer.innerHTML = `
    <img src=http://${encodeURI(
    aboutMeInfo.image
  )}  alt = "" class="w-full h-full rounded-full">
    `;
  aboutContainer.innerText = aboutMeInfo.aboutme;
  emailContainer.innerText = aboutMeInfo.email;
  numberContainer.innerText = aboutMeInfo.contact;
  educationContainer.innerText = aboutMeInfo.education;
});
