import HTTP from './urlConfig'

//variables and constants 
const registerBtn = document.querySelector('.register-btn') as HTMLButtonElement 
const loginBtn = document.querySelector('.login-btn') as HTMLButtonElement

const email = document.querySelector('#email') as HTMLInputElement
const password = document.querySelector('#password') as HTMLInputElement
const toastContainer = document.querySelector('.toast-container') as HTMLElement

//event listners
registerBtn.addEventListener('click',(event)=>
{
    event.preventDefault()
    window.location.href = '../signup.html'
})


loginBtn.addEventListener('click', async (event) =>
{
    event.preventDefault()
    const userEmail = email.value
    const userPassword = password.value

    try
    {
        const result =await HTTP.post('/user/login',
        {
            email: userEmail,
            password: userPassword
        })
        toastContainer.innerHTML= ''
        toastContainer.innerHTML += `
            <p class="bg-green-400 text-white p-5 rounded-xl w-[250px] text-center text-xl font-semibold m-5">
            User logged in
            </p>
            `
        console.log(result.data.data.role);

        const dataToStore = {
            userName : result.data.data.name,
            userEmail : result.data.data.email,
            accessToken : result.data.accessToken,
            refreshToken : result.data.refreshToken,
            role : result.data.data.role
        }
        const jsonDataToStore = JSON.stringify(dataToStore)
        
        if(localStorage.getItem('userInfo')) localStorage.removeItem('userInfo')
        localStorage.setItem('userInfo', jsonDataToStore)
       
        setTimeout(()=>
        {
            window.location.href = '../index.html'
        }, 1000)
    }
    catch(error: any)
    {
        const errorData = error.response.data.error
        console.log(error);
        
        if(!Array.isArray(errorData))
        {
             toastContainer.innerHTML += `
                <p class="bg-red-400 text-white p-5 rounded-xl w-[250px] text-center text-xl font-semibold m-5">
                    ${errorData}
                </p>
                `
                return  
        }
        //@ts-ignore
        errorData.forEach( err =>
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
