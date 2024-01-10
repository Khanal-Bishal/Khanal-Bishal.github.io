import HTTP from './urlConfig'
import { checkIsAdmin } from './utils'

//variables and constants 
const textContainer = document.querySelector('.text-container') as HTMLTextAreaElement
const fileInput = document.querySelector('#fileInput') as HTMLInputElement
const addFile = document.querySelector('.add-file') as HTMLInputElement

const titleInput = document.querySelector('.title-input') as HTMLInputElement
const postButton= document.querySelector('.post-button') as HTMLButtonElement
const toastContainer = document.querySelector('.toast-container') as HTMLElement

const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)

// event listener 



//onload event
window.addEventListener('load', () =>
{
    if (userInfo== null || !checkIsAdmin(userInfo.role)) 
    {
        window.location.href = '../404.html'
        return
    }
})

//function for infinite textarea expansion
textContainer.addEventListener('input', function () 
{
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
})

//function for getting file name after importing from system
fileInput.addEventListener('change', (event: any)=>
{
    const fileName = event.target.files[0].name
     addFile.innerText = fileName 
}
)

//event when admin post the blog
postButton.addEventListener('click', async (event)=>
{
    event.preventDefault()
    const inputTitle = titleInput.value
    const inputText = textContainer.value
    let fileName
    if (fileInput.files && fileInput.files.length > 0) 
    {
        const fileName = fileInput.files[0].name;
        addFile.innerText = fileName;
    } 
    else
    {
        addFile.innerText = "No file selected";
    }
    try 
    { 
       
        const result = await  HTTP.post('/blog',
            {
                title: inputTitle,
                description: inputText,
                image: fileName
            }         
        )
        textContainer.value = "" 
        titleInput.value = " "
        addFile.innerText = "ADD IMAGE"
        toastContainer.innerHTML += `
            <p class="bg-green-400 text-white p-5 rounded-xl w-[250px] text-center text-xl font-semibold m-5">
            Blog posted
            </p>
            `
        setTimeout(()=>
        {
            toastContainer.innerHTML = ""
        },1000)

    }catch (error: any)
    {
        const errorData = error.response.data.error
        
         //@ts-ignore
        errorData.forEach( err =>
            {
                toastContainer.innerHTML += `
                <p class="bg-red-400 my-5 text-white p-5 rounded-xl w-[40%] m-auto text-center text-sm font-semibold m-5">
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

