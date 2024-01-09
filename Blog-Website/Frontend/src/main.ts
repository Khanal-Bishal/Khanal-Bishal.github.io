import './style.css'
import HTTP from './urlConfig'
import IBlog from './interface/IBlog'

//constants and variables
const blogsContainer = document.querySelector('.blogs-container') as HTMLElement
const randomBlogContainer = document.querySelector('.random-blog-container') as HTMLElement
const userNameContainer = document.querySelector('.username-container') as HTMLParagraphElement
const loginContainer = document.querySelector('.login-container') as HTMLParagraphElement
const logoutContainer =document.querySelector('.logout-container') as HTMLParagraphElement
const signupContainer  = document.querySelector('.signup-container') as HTMLParagraphElement
//fetching data for all the blogs 
window.addEventListener('load', async ()=>
{   
    const result = await HTTP.get( '/blog?page=1' )
    const totalPage = result.data.totalPage
    const blogs = (result.data.data) as IBlog[]
    const storedUserInfo = localStorage.getItem('userInfo') as string
    const userInfo = JSON.parse(storedUserInfo)

    if(userInfo?.userName) userNameContainer.innerText = userInfo.userName
    if(userInfo)  logoutContainer.innerHTML = `<img src="./src/assets/icons/logout.svg" alt="logout" width="25">`
    if(!userInfo) loginContainer.innerText = "Login"
    if(!userInfo) signupContainer.innerText = "Register"
    blogs.forEach( res =>
    {   
        blogsContainer.innerHTML += `
            <div class=" relative cursor mb-3 w-[48%] mx-1 ">
                 <figure class="relative ">
                    <img src= ${res.image} alt="blogImage "
                    class="w-[100%] opacity-50 h-[500px] aspect-square ">
                    <div class="absolute inset-0 bg-black opacity-55 hover:opacity-40"></div>
                </figure>

                <div class="absolute top-[50%] left-10 translate-y-[-50%] text-white ">
                    <h2 class="font-bold text-4xl capitalize w-[45%]"> ${res.title} </h2>
                    <p class="w-[45%] mt-5 text-2xl"> ${res.description} </p>
                <a href='/blog?id=${res.blog_id}'>
                <button
                class="border rounded-xl p-4 mt-7 text-xl font-semibold w-[150px] hover:bg-[#7ca9aa] hover:border-none transition-all "> Read
                more</button> </a>
                </div>
            </div>
             `
    })   

    const randomBlogResult = await HTTP.get(`/blog?page=${ Math.floor(Math.random() * totalPage ) }`)
    const randomBlog = randomBlogResult.data.data as IBlog[]
    randomBlogContainer.innerHTML = `
    <div class=" relative cursor mb-3 w-[66%] mx-1  ">
          <figure class="relative rounded-lg">
            <img src=${randomBlog[0].image} alt="blogImage " class="w-[100%] opacity-50 h-[500px] aspect-square ">
            <div class="absolute inset-0 bg-black opacity-55 hover:opacity-40"></div>
          </figure>

          <div class="absolute top-[50%] left-10 translate-y-[-50%] text-white ">
            <h2 class="font-bold text-4xl capitalize w-[45%]"> ${ randomBlog[0].title } </h2>
            <p class="w-[45%] mt-5 text-2xl"> ${ randomBlog[0].description }</p>
            <button
              class="border rounded-xl p-4 mt-7 text-xl font-semibold w-[150px] hover:bg-[#7ca9aa] hover:border-none transition-all ">Read
              more pls</button>
          </div>
        </div>

        <div class=" relative cursor mb-3 w-[30%] mx-1 ">
          <figure class="relative ">
            <img src=${randomBlog[1].image} alt="blogImage " class="w-[100%] opacity-50 h-[500px] aspect-square ">
            <div class="absolute inset-0 bg-black opacity-55 hover:opacity-40"></div>
          </figure>

          <div class="absolute top-[50%] left-10 translate-y-[-50%] text-white ">
            <h2 class="font-bold text-4xl capitalize w-[45%]"> ${randomBlog[1].title} </h2>
            <p class="w-[45%] mt-5 text-2xl"> ${randomBlog[1].description} </p>
            <button
              class="border rounded-xl p-4 mt-7 text-xl font-semibold w-[150px] hover:bg-[#7ca9aa] hover:border-none transition-all ">Read
              more</button>
          </div>
        </div>
      </div>
    `
})

//event for logging 
logoutContainer.addEventListener('click', (event)=>
{
  event.preventDefault()
  localStorage.removeItem('userInfo')

  setTimeout( ()=>
  {
    window.location.reload()
  },200)
})


