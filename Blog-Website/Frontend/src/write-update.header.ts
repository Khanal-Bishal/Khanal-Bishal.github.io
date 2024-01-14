import { logout } from './reusedFunction'

const menuIcon = document.querySelector('.menu-icon') as HTMLElement
const menuOpener = document.querySelector('.menu-opener') as HTMLElement
const userName = document.querySelector('.user-name') as HTMLElement
const mobileLogin = document.querySelector('.mobile-login') as HTMLElement
const closeIcon = document.querySelector('.x-icon') as HTMLElement


menuIcon.addEventListener('click', () => {
    console.log('icon clicked')

    const storedUserInfo = localStorage.getItem('userInfo') as string
    const userInfo = JSON.parse(storedUserInfo)

    if (!userInfo?.userName) {
        userName.innerText = ''
        mobileLogin.innerHTML = `<a href='./login'>Login</a>`

    }
    if (userInfo?.userName) {
        userName.innerText = userInfo.userName
        mobileLogin.innerHTML = `<p>Logout</p>`
    }
    menuOpener.style.display = 'block'
})

mobileLogin.addEventListener('click', () => {
    const storedUserInfo = localStorage.getItem('userInfo') as string
    const userInfo = JSON.parse(storedUserInfo)
    if (userInfo?.userName) logout()

})

closeIcon.addEventListener('click', () => {
    menuOpener.style.display = 'none'
})