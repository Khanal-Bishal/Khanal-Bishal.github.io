import HTTP from './urlConfig'
import axios from 'axios'

//variables and constants
const nameInput = document.querySelector('#name') as HTMLInputElement
const emailInput = document.querySelector('#email') as HTMLInputElement
const passwordInput = document.querySelector('#password') as HTMLInputElement
const registerBtn = document.querySelector('.register-btn') as HTMLButtonElement
const toastContainer = document.querySelector('.toast-container') as HTMLDivElement

//events 
registerBtn.addEventListener('click', async (event) =>
{   
    event.preventDefault()
    const userName = nameInput.value
    const userEmail = emailInput.value
    const userPassword = passwordInput.value
    try 
    {

        await HTTP.post('/user/signup', {
            name: userName,
            email:userEmail,
            password: userPassword
        });
        toastContainer.innerHTML= ''
        toastContainer.innerHTML += `
                <p class="bg-green-400 text-white p-5 rounded-xl w-[250px] text-center text-xl font-semibold m-5">
                    User registered
                </p>
                `
        setTimeout(()=>
        {
            window.location.href = '../login.html'
        },1000)
    }
    catch(error:any)
    {
        toastContainer.innerHTML = ""
        //@ts-ignore
        error.response.data.error.forEach( err =>
            {
                toastContainer.innerHTML += `
                <p class="bg-red-400 text-white p-5 rounded-xl w-[250px] text-center text-xl font-semibold m-5">
                    ${err.message}
                </p>
                `
                console.log(err.message);
                
            })
        setTimeout( ()=>
        {
            toastContainer.innerHTML= ""
        },1500)
    }

  
})
