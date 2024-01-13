import HTTP from "./urlConfig";
import axios from "axios";

//variables and constants
const nameInput = document.querySelector("#name") as HTMLInputElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;
const registerBtn = document.querySelector(
  ".register-btn"
) as HTMLButtonElement;
const toastContainer = document.querySelector(
  ".toast-container"
) as HTMLDivElement;

//events
registerBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const userName = nameInput.value;
  const userEmail = emailInput.value;
  const userPassword = passwordInput.value;
  try {
    const result = await HTTP.post("/user/signup", {
      name: userName,
      email: userEmail,
      password: userPassword,
    });

    console.log(result);
    toastContainer.innerHTML = "";
    toastContainer.innerHTML += `
                <p class="bg-green-800 text-white p-5  w-[300px] text-center text-xl font-semibold m-5">
                    User registered
                </p>
                `;
    setTimeout(() => {
      window.location.href = "../login.html";
    }, 1000);
  } catch (error: any) {
    toastContainer.innerHTML = "";
    console.log(error);

    //@ts-ignore
    error.response.data.error.forEach((err) => {
      toastContainer.innerHTML += `
                <p class="bg-red-800 text-white p-5  w-[300px] text-center text-xl font-semibold ">
                    ${err.message}
                </p>
                `;
      console.log(err.message);
    });
    setTimeout(() => {
      toastContainer.innerHTML = "";
    }, 1500);
  }
});
