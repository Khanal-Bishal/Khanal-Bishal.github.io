import './style.css'
import HTTP from './urlConfig'
import IBlog from './interface/IBlog'
import queryString from 'query-string'
import { convertIsoToFormattedData } from './utils'

// variables and constants 
const headingContainer = document.querySelector('.heading') as HTMLElement
const dateContainer = document.querySelector('.date-container') as HTMLParagraphElement
const totalCommentContainer = document.querySelector('.total-comment-container') as HTMLSpanElement
const blogImageContainer = document.querySelector('.blog-image-container') as HTMLImageElement
const blogDescriptionContainer = document.querySelector('.blog-desc-container') as HTMLElement
const blogCardContainer = document.querySelector('.blog-card-container') as HTMLElement
const commentsContainer = document.querySelector('.comments-container') as HTMLDivElement


//event listner
window.addEventListener('load', async(event) =>
{
    event.preventDefault()
    const singleBlogId = queryString.parse(location.search)
    console.log(singleBlogId);
    const result = await HTTP.get(`/blog/${singleBlogId.blog_id}`)
    const blogInfo = result.data.data
 
    const totalComments = blogInfo.Comments.length
    const formattedDate = convertIsoToFormattedData(blogInfo.createdAt)

    headingContainer.innerText = blogInfo.title
    dateContainer.innerText = formattedDate
    totalCommentContainer.innerText = totalComments
    blogImageContainer.innerHTML = `
        <img src=${blogInfo.image} alt="" class=" w-[100%] h-[100%]">
    `
    blogDescriptionContainer.innerHTML = `
        <p class=" text-xl font-thin  text-gray-400 text-justify ">${blogInfo.description}</p>
    `    
    const tempBlogResult = await HTTP.get(`/blog`)
    const tempBlogInfo = tempBlogResult.data
    
    //you may also like section 
    const randomBlogResult = await HTTP.get(`/blog?page=${Math.ceil(Math.random()*tempBlogInfo.totalPage )}`)
    const randomBlogInfo = randomBlogResult.data.data
    
    for(let index = 1; index <= 3; index++)
    {
        blogCardContainer.innerHTML += `
            <div class="mt-7 flex gap-6 w-[30%] ">
                <div class="">
                    <figure class="">
                        <img src=${randomBlogInfo[index].image} alt="" class="h-[80%] w-[100%] object-fill">
                    </figure>
                    <h2 class="font-bold text-4xl mt-7">${randomBlogInfo[index].title}</h2>
                    <div class="flex flex-row gap-7 mt-7 text-xl uppercase ">
                        <span class="text-gray-500 uppercase">${convertIsoToFormattedData(randomBlogInfo[0].createdAt)} </span>
                        <span class="text-black">${randomBlogInfo[index].Comments.length} Comments</span>
                    </div>
                </div>
            </div>
        `
    }

   
   //for comments
   if(totalComments === 0 )  
   {
     commentsContainer.innerHTML+=`
        <div class="mt-32 text-center text-xl font-semibold">
           NO COMMENTS...
        </div>
        `
   }
    for (let index = 0; index <= totalComments; index++)
    {
        commentsContainer.innerHTML+=`
        <div class="mt-10">
            <div class="flex flex-col gap-2">
                <span class="capitalize text-3xl font-bold">${blogInfo.Comments[index].User?.name}</span>
                <span class="uppercase text-xs tracking-tight">${convertIsoToFormattedData(blogInfo.Comments[index].createdAt)}</span>
            </div>
            <div class="mt-3 text-gray-500">
                <p class="text-2xl">${blogInfo.Comments[index].comment}</p>
            </div>
        </div>
        `
    }
    








})

