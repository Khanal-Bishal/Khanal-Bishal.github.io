import HTTP from './urlConfig'
import IBlog from './interface/IBlog'
import { convertIsoToFormattedData } from './utils'
import { getRandomBlogs, getSingleRandomBlog } from './reusedFunction'
import { checkIsAdmin } from './utils'

//constants and variablesconst blogsContainer = document.querySelector('.blogs-container') as HTMLElement
const blogImageContainer = document.querySelector('.blog-image-container') as HTMLElement
const heading = document.querySelector('.heading') as HTMLElement
const commentContainer = document.querySelector('.total-comment-container') as HTMLElement
const sblogImageContainer = document.querySelector('.single-blog-first-image') as HTMLElement
const firstDescription = document.querySelector('.first-blog-description') as HTMLElement
const readMore = document.querySelector('.read-more') as HTMLElement
const youMayLikeContainer = document.querySelectorAll('.youMayLike-container') as NodeListOf<Element>
const secondBlogHeading = document.querySelector('.s-heading') as HTMLElement
const secondCommentContainer = document.querySelector('.stotal-comment-container') as HTMLElement
const secondBlogImageContainer = document.querySelector('.single-blog-second-image') as HTMLElement
const secondReadMore = document.querySelector('.second-read-more') as HTMLElement
const secondDescription = document.querySelector('.second-blog-description') as HTMLElement
const dashboardContainer = document.querySelector('.dashboard-container') as HTMLElement

//fetching data for all the blogs
window.addEventListener('load', async () => {
  const result = await HTTP.get('/blog?page=1')
  const totalPage = result.data.totalPage
  let randomBlogs = await getRandomBlogs(totalPage)
  let randomBlog = await getSingleRandomBlog(totalPage)

  try {
    const result = await HTTP.get('/user/me')
    const user = result.data.data

    if (checkIsAdmin(user.role)) {
      dashboardContainer.style.display = 'block'
    }
  } catch (error) {
    console.log('error is here', error)
  }


  blogImageContainer.innerHTML = `
      <div class=' relative cursor mb-3 w-[100%] mx-1 sm:w-[60%] '>
        <figure class='relative '>
          <img src=${encodeURI(
    randomBlogs[0].image
  )} alt='blogImage ' class='w-[100%] h-[250px] aspect-square object-cover sm:h-[408px]  '>
          <div class='absolute inset-0 bg-black opacity-65 hover:opacity-15'></div>
        </figure>

        <div class='absolute top-[50%] left-[30%] translate-y-[-50%] translate-x-[-30%] text-white '>
          <h2 class='font-bold text-4xl capitalize w-[85%]'> ${randomBlogs[0].title
    } </h2>
          <div class='flex gap-4 mt-5'>
            <span>By Boboca</span>
            <span>${convertIsoToFormattedData(randomBlogs[0].createdAt)}</span>
            <span>${randomBlogs[0].Comments.length} Comments</span>
          </div>
          <button class='border-none bg-red-300 uppercase p-4 mt-7 text-xl font-semibold w-[150px]   text-center '> 
             <a href='/singleblog?blog_id=${randomBlogs[0].blog_id}'> Read more </a>
          </button> 
        </div>
      </div>

      <div class='w-[100%] sm:w-[40%] '>
        <div class=' relative cursor mb-3 w-[100%] mx-1  '>
          <figure class='relative '>
            <a href='/singleblog?blog_id=${randomBlogs[1].blog_id}'>
            <img src=${encodeURI(randomBlogs[1].image)} alt='blogImage ' class='w-[100%] h-[250px]  aspect-square object-cover  sm:h-[200px] '>
            <div class='absolute inset-0 bg-black opacity-65 hover:opacity-15'></div>
          </figure>

          <div class='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white '>
            <h2 class='font-bold text-4xl capitalize  text-center'>${randomBlogs[1].title}</h2>
            <div class='flex justify-center font-semibold gap-10 uppercase mt-5'>
              <p class=' mt-5 text-sm text-gray-200'> In Blog </p>
              <p class=' mt-5 text-sm'> ${convertIsoToFormattedData(randomBlogs[1].createdAt)} </p>
            </div>
          </div>
        </div>

        <div class=' relative cursor mb-3 w-[100%] mx-1 '>
          <figure class='relative'>
            <a href='/singleblog?blog_id=${randomBlogs[2].blog_id}'>
            <img src=${encodeURI(randomBlogs[2].image)} alt='blogImage ' class='w-[100%]  h-[250px] aspect-square object-cover sm:h-[200px] '>
            <div class='absolute inset-0 bg-black opacity-65 hover:opacity-15'></div>
          </figure>

          <div class='absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white '>
            <h2 class='font-bold text-4xl capitalize  text-center'> ${randomBlogs[2].title}</h2>
            <div class='flex justify-center font-semibold gap-10 uppercase mt-5'>
              <p class=' mt-5 text-sm text-gray-200'> In Blog </p>
              <p class=' mt-5 text-sm'> ${convertIsoToFormattedData(randomBlogs[2].createdAt)} </p>
            </div>
          </div>
        </div>
      </div>
    `
  console.log(randomBlog)
  heading.innerText = randomBlog.title
  firstDescription.innerText = randomBlog.description
  commentContainer.innerText = randomBlog.Comments.length
  sblogImageContainer.innerHTML = `
        <img src=${encodeURI(
    randomBlog.image
  )} alt='blogImage ' class='w-[100%]  h-[250px] aspect-square object-cover sm:h-[450px] '>
        <a href='/singleblog?blog_id=${randomBlog.blog_id
    }' class='absolute inset-0 bg-black opacity-35 hover:opacity-75'></a>
      `
  readMore.innerHTML = `
  <a href='/singleblog?blog_id=${randomBlog.blog_id}'>Read more </a>
  `

  // second random single blog
  randomBlog = await getSingleRandomBlog(totalPage)
  secondBlogHeading.innerText = randomBlog.title
  secondDescription.innerText = randomBlog.description
  secondCommentContainer.innerText = randomBlog.Comments.length
  secondBlogImageContainer.innerHTML = `
        <img src=${encodeURI(
    randomBlog.image
  )} alt='blogImage ' class='w-[100%]  h-[250px] aspect-square object-cover sm:h-[450px] '>
        <a href='/singleblog?blog_id=${randomBlog.blog_id
    }' class='absolute inset-0 bg-black opacity-35 hover:opacity-75'></a>
      `
  secondReadMore.innerHTML = `
  <a href='/singleblog?blog_id=${randomBlog.blog_id}'>Read more </a>
  `
  youMayLikeContainer.forEach(async (container) => {
    randomBlogs = await getRandomBlogs(totalPage)
    for (let index = 0; index < 3; index++) {
      container.innerHTML += `
      <div class='mt-7 sm:w-[33%] sm:mt-0'>
        <figure class=''>
        <a href='./singleblog?blog_id=${randomBlogs[index].blog_id}'>
        <img src=${encodeURI(randomBlogs[index].image)} alt=''
        class='h-[100%] w-[100%] object-fill opacity-70 hover:opacity-100'>
        </a>
        </figure>
        <h2 class='font-bold text-2xl mt-7 cursor'>${randomBlogs[index].title
        } </h2>
        <div class='flex flex-row gap-7 mt-2 text-xs uppercase '>
        <span class='text-gray-500 uppercase'>${convertIsoToFormattedData(
          randomBlogs[index].createdAt
        )} </span>
        <span class='text-black'>${randomBlogs[index].Comments.length
        } comment</span>
      </div>
      </div>
      `
    }
  })
})
