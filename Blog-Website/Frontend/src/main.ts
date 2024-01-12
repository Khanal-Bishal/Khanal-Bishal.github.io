import HTTP from './urlConfig'
import IBlog from './interface/IBlog'
import { convertIsoToFormattedData } from './utils'
import { getRandomBlogs, getSingleRandomBlog } from './reusedFunction'

//constants and variablesconst blogsContainer = document.querySelector('.blogs-container') as HTMLElement
const blogImageContainer = document.querySelector('.blog-image-container') as HTMLElement
const heading = document.querySelector('.heading') as HTMLElement
const commentContainer = document.querySelector('.total-comment-container') as HTMLSpanElement
const randomBlogsContainer = document.querySelector('.random-blog-container') as HTMLSpanElement
const firstSblogImgContainer = document.querySelector('.first-sblog-image-container') as HTMLSpanElement
const readMore = document.querySelector('.read-more') as HTMLElement

//fetching data for all the blogs 
window.addEventListener('load', async ()=>
{   
  const result = await HTTP.get( '/blog?page=1' )
  const totalPage = result.data.totalPage
  const randomBlogs = await getRandomBlogs(totalPage)
  let randomBlog = await getSingleRandomBlog(totalPage)
  console.log(randomBlogs);
  blogImageContainer.innerHTML =
    `
      <div class=" relative cursor mb-3 w-[60%] mx-1  ">
        <figure class="relative ">
          <img src=${encodeURI(randomBlogs[0].image)} alt="blogImage " class="w-[100%]  h-[408px] aspect-square object-cover  ">
          <div class="absolute inset-0 bg-black opacity-65 hover:opacity-45"></div>
        </figure>

        <div class="absolute top-[50%] left-[30%] translate-y-[-50%] translate-x-[-30%] text-white ">
          <h2 class="font-bold text-4xl capitalize w-[85%]"> ${randomBlogs[0].title} </h2>
          <div class="flex gap-4 mt-5">
            <span>By Boboca</span>
            <span>${convertIsoToFormattedData(randomBlogs[0].createdAt)}</span>
            <span>${randomBlogs[0].Comments.length} Comments</span>
          </div>
          <button class="border-none bg-red-300 uppercase p-4 mt-7 text-xl font-semibold w-[150px]   text-center "> 
            Read more 
            </a>
            </button> 
        </div>
      </div>

      <div class="w-[40%]">
        <div class=" relative cursor mb-3 w-[100%] mx-1  ">
          <figure class="relative ">
          <img src=${encodeURI(randomBlogs[1].image)} alt="blogImage " class="w-[100%]  h-[200px] aspect-square object-cover  ">
          <div class="absolute inset-0 bg-black opacity-65 hover:opacity-45"></div>
          </figure>

          <div class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white ">
            <h2 class="font-bold text-4xl capitalize  text-center">${randomBlogs[1].title}</h2>
            <div class="flex justify-center font-semibold gap-10 uppercase mt-5">
              <p class=" mt-5 text-sm text-gray-200"> In Blog </p>
              <p class=" mt-5 text-sm"> ${convertIsoToFormattedData(randomBlogs[1].createdAt)} </p>
            </div>
          </div>
        </div>

        <div class=" relative cursor mb-3 w-[100%] mx-1  ">
          <figure class="relative ">
          <img src=${encodeURI(randomBlogs[1].image)} alt="blogImage " class="w-[100%]  h-[200px] aspect-square object-cover  ">
          <div class="absolute inset-0 bg-black opacity-65 hover:opacity-45"></div>
          </figure>

          <div class="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white ">
            <h2 class="font-bold text-4xl capitalize  text-center"> Here will be title</h2>
            <div class="flex justify-center font-semibold gap-10 uppercase mt-5">
              <p class=" mt-5 text-sm text-gray-200"> In Blog </p>
              <p class=" mt-5 text-sm"> ${convertIsoToFormattedData(randomBlogs[1].createdAt)} </p>
            </div>
          </div>
        </div>
      </div>
    `
  heading.innerText = randomBlog.title
  commentContainer.innerText = randomBlog.Comments.length

  firstSblogImgContainer.innerHTML =
  `
    <img src=${encodeURI(randomBlog.image)} alt="blogImage " class="w-[100%]  h-[450px] aspect-square object-cover  ">
    <a href='/singleblog?blog_id=${randomBlog.blog_id}' class="absolute inset-0 bg-black opacity-35 hover:opacity-75"></a>

  `

  readMore.innerHTML = `
  <a href='/singleblog?blog_id=${randomBlog.blog_id}'>Read more </a>
  `



    

})




