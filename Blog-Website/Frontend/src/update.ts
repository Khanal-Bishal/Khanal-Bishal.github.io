import HTTP from './urlConfig'
import { checkIsAdmin } from './utils'
import queryString from 'query-string'

//variables and constants 
const textContainer = document.querySelector('.text-container') as HTMLTextAreaElement
const fileInput = document.querySelector('#fileInput') as HTMLInputElement
const addFile = document.querySelector('.add-file') as HTMLInputElement

const form = document.querySelector('.form') as HTMLFormElement
const titleInput = document.querySelector('.title-input') as HTMLInputElement
const updateButton= document.querySelector('.update-button') as HTMLButtonElement
const toastContainer = document.querySelector('.toast-container') as HTMLElement
const idContainer = document.querySelector('.id-container') as HTMLSpanElement

const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)
const blogId = queryString.parse(location.search)

// event listener 

//onload event
window.addEventListener('load', async () =>
{
    if (userInfo== null || !checkIsAdmin(userInfo.role)) 
    {
        window.location.href = '../404.html'
        return
    }    
    const result = await HTTP.get(`/blog/${blogId.blog_id}`)
    const blogInfo = result.data.data
    console.log(blogInfo);
    idContainer.innerText = blogInfo.blog_id
    titleInput.value = blogInfo.title
    textContainer.value = blogInfo.description
    
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

//event when admin updates  the blog
updateButton.addEventListener('click', async (event)=>
{
    event.preventDefault()
    const inputTitle = titleInput.value
    const inputText = textContainer.value
    // let fileName
    const formData = new FormData(form)
    // if (fileInput.files && fileInput.files.length > 0) 
    // {
    //     const fileName = fileInput.files[0].name;
    //     addFile.innerText = fileName;
    // } 
    // else
    // {
    //     addFile.innerText = "No file selected";
    // }   


    try 
    { 
        console.log(formData);

        const result = await  HTTP.put(`/blog/${blogId.blog_id}`,
            
                // title: inputTitle,
                // description: inputText,
                // image: fileName
                formData
                     
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

        setTimeout(() =>
        {
            window.location.href = '../dashboard'
        })
    }
    catch (error: any)
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
        },3000)


    }
    
    
    
})

