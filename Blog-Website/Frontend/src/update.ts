import HTTP from './urlConfig'
import { checkIsAdmin } from './utils'
import queryString from 'query-string'

//variables and constants
const textContainer = document.querySelector(
  '.text-container'
) as HTMLTextAreaElement
const fileInput = document.querySelector('#fileInput') as HTMLInputElement
const addFile = document.querySelector('.add-file') as HTMLInputElement

const form = document.querySelector('.form') as HTMLFormElement
const titleInput = document.querySelector('.title-input') as HTMLInputElement
const updateButton = document.querySelector('.update-button') as HTMLButtonElement
const toastContainer = document.querySelector('.toast-container') as HTMLElement
const idContainer = document.querySelector('.id-container') as HTMLSpanElement

const unparsedUserInfo = localStorage.getItem('userInfo') as any
const userInfo = JSON.parse(unparsedUserInfo)
const blogId = queryString.parse(location.search)

// event listener

//onload event
window.addEventListener('load', async () => {
  if (!userInfo?.accessToken) window.location.href = '../404'
  try {
    const result = await HTTP.get('/user/me')
    const user = result.data.data
    console.log(user.role)
    if (!checkIsAdmin(user.role)) {
      window.location.href = '../404.html'
      return
    }
  } catch (error) {
    console.log('error is here', error)
  }

  const result = await HTTP.get(`/blog/${blogId.blog_id}`)
  const blogInfo = result.data.data
  console.log(blogInfo)
  idContainer.innerText = blogInfo.blog_id
  titleInput.value = blogInfo.title
  textContainer.value = blogInfo.description
})

//function for infinite textarea expansion
textContainer.addEventListener('input', function () {
  this.style.height = 'auto'
  this.style.height = this.scrollHeight + 'px'
})

//function for getting file name after importing from system
fileInput.addEventListener('change', (event: any) => {
  const fileName = event.target.files[0].name
  addFile.innerText = fileName
})

//event when admin updates  the blog
updateButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const formData = new FormData(form)

  try {
    await HTTP.put(`/blog/${blogId.blog_id}`, formData)
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
    }, 1500)

    setTimeout(() => {
      window.location.href = '../dashboard'
    }, 1500)
  } catch (error: any) {
    const errorData = error.response.data.error


    errorData.forEach((err: any) => {
      toastContainer.innerHTML += `
                <p class='bg-red-800 my-5 text-white p-5  w-[40%] mx-auto text-center text-sm font-semibold m-5'>
                    ${err.message}
                </p>
                `
      console.log(err.message)
    })
    setTimeout(() => {
      toastContainer.innerHTML = ''
    }, 1000)
  }
})
