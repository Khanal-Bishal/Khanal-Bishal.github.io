import { logout } from './reusedFunction'

//constants and variables
const blogsContainer = document.querySelector('.blogs-container') as HTMLElement
const randomBlogContainer = document.querySelector('.random-blog-container') as HTMLElement
const userNameContainer = document.querySelector('.username-container') as HTMLParagraphElement
const loginContainer = document.querySelector('.login-container') as HTMLParagraphElement
const logoutContainer = document.querySelector('.logout-container') as HTMLParagraphElement
const signupContainer = document.querySelector('.signup-container') as HTMLParagraphElement
const personIcon = document.querySelector('.person-icon') as HTMLParagraphElement
const closeIcon = document.querySelector('.x-icon') as HTMLElement
const menuOpener = document.querySelector('.menu-opener') as HTMLElement
const menuIcon = document.querySelector('.menu-icon') as HTMLElement
const userName = document.querySelector('.user-name') as HTMLElement
const mobileLogin = document.querySelector('.mobile-login') as HTMLElement
const searchBtn = document.querySelector('.search-btn') as HTMLElement
const searchCloseBtn = document.querySelector('.search-close-btn') as HTMLLIElement
const searchForm = document.querySelector('.search-form') as HTMLFormElement
const mainContainer = document.querySelector('.main-section-container') as HTMLElement
const searchInput = document.querySelector('.search-input') as HTMLInputElement

window.addEventListener('load', () => {
  const storedUserInfo = localStorage.getItem('userInfo') as string
  const userInfo = JSON.parse(storedUserInfo)

  if (!userInfo?.userName) {
    personIcon.style.display = 'none'
    userNameContainer.innerText = ''
    mobileLogin.innerHTML = `<a href='./login'>Login</a>`
  }
  if (userInfo?.userName) {
    personIcon.style.display = 'block'
    userNameContainer.innerText = userInfo.userName
    mobileLogin.innerHTML = `<a href='./'>Logout</a>`
  }
  if (userInfo)
    logoutContainer.innerHTML = `<i class='logout-container fa-solid fa-right-from-bracket'></i>`
  if (!userInfo) loginContainer.innerText = 'Login'
  if (!userInfo) signupContainer.innerText = 'Register'
})

closeIcon.addEventListener('click', () => {
  menuOpener.style.display = 'none'
})

menuIcon.addEventListener('click', () => {
  const storedUserInfo = localStorage.getItem('userInfo') as string
  const userInfo = JSON.parse(storedUserInfo)

  if (!userInfo?.userName) {
    userName.innerText = ''
  }
  if (userInfo?.userName) {
    userName.innerText = userInfo.userName
  }
  menuOpener.style.display = 'block'
})

//event for logging
logoutContainer.addEventListener('click', (event) => {
  event.preventDefault()
  logout()
})

mobileLogin.addEventListener('click', () => {
  const storedUserInfo = localStorage.getItem('userInfo') as string
  const userInfo = JSON.parse(storedUserInfo)
  if (userInfo?.userName) logout()

})

searchCloseBtn.addEventListener('click', () => {
  searchForm.style.display = 'none'
  mainContainer.style.display = 'block'
})

searchBtn.addEventListener('click', () => {
  mainContainer.style.display = 'none'
  searchForm.style.display = 'flex'
  searchInput.focus()
})

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const userInput = searchInput.value
  window.location.href = `../blogs?search_term=${userInput}`
})

