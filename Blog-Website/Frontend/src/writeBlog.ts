import HTTP from './urlConfig'
import { checkIsAdmin } from './utils'
import axios from 'axios'

//variables and constants 
const textContainer = document.querySelector('.text-container') as HTMLTextAreaElement
const fileInput = document.querySelector('#fileInput') as HTMLInputElement
const addFile = document.querySelector('.add-file') as HTMLInputElement
const form = document.querySelector('#form') as HTMLFormElement

const titleInput = document.querySelector('.title-input') as HTMLInputElement
const postButton = document.querySelector('.post-button') as HTMLButtonElement
const toastContainer = document.querySelector('.toast-container') as HTMLElement

const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)

// event listener 
//onload event
window.addEventListener('load', async () => {
  if (!userInfo?.accessToken) window.location.href = '../404'
  try {
    const result = await HTTP.get('/user/me')
    const user = result.data.data
    console.log(user.role)
    if (!checkIsAdmin(user.role)) {
      window.location.href = '../404'
      return
    }
  } catch (error) {
    console.log('error is here', error)
  }

})

//function for infinite textarea expansion
textContainer.addEventListener('input', function () {
  this.style.height = 'auto'
  this.style.height = (this.scrollHeight) + 'px'
})

//function for getting file name after importing from system
fileInput.addEventListener('change', (event: any) => {
  const fileName = event.target.files[0].name
  addFile.innerText = fileName
}
)

//event when admin post the blog
postButton.addEventListener('click', async (event) => {
  event.preventDefault()
  const formData = new FormData(form)

  try {
    console.log(formData)
    await HTTP.post('/blog', formData)
    console.log('clicked')
    textContainer.value = ''
    titleInput.value = ' '
    addFile.innerText = 'ADD IMAGE'
    toastContainer.innerHTML += `
            <p class='bg-green-800 text-white p-5  w-[350px] text-center text-xl font-semibold m-5'>
            Blog posted
            </p>
            `
    setTimeout(() => {
      toastContainer.innerHTML = ''
      window.location.href = '../dashboard.html'
    }, 1000)


  } catch (error: any) {
    console.log(error)
    const errorData = error.response.data.error

    //@ts-ignore
    errorData.forEach(err => {
      toastContainer.innerHTML += `
                <p class='bg-red-800 my-5 text-white p-5  w-[40%] mx-auto text-center text-sm font-semibold m-5'>
                    ${err.message}
                </p>
                `
      console.log(err.message)
    })
    setTimeout(() => {
      toastContainer.innerHTML = ''
    }, 1500)

  }

})

