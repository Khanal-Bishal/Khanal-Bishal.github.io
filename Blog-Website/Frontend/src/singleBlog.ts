import HTTP from "./urlConfig"
import queryString from "query-string"
import { convertIsoToFormattedData } from "./utils"

// variables and constants
const headingContainer = document.querySelector(".heading") as HTMLElement
const dateContainer = document.querySelector(".date-container") as HTMLParagraphElement
const totalCommentContainer = document.querySelector(".total-comment-container") as HTMLSpanElement
const blogImageContainer = document.querySelector(".blog-image-container") as HTMLImageElement
const blogDescriptionContainer = document.querySelector(".blog-desc-container") as HTMLElement
const blogCardContainer = document.querySelector(".blog-card-container") as HTMLElement
const commentsContainer = document.querySelector(".comments-container") as HTMLDivElement
const authorMugshot = document.querySelector(".author-mugshot") as HTMLElement
const commentBtn = document.querySelector(".comment-btn") as HTMLButtonElement
const commentInput = document.querySelector("#comment") as HTMLInputElement
const singleBlogId = queryString.parse(location.search)

//event listner
window.addEventListener("load", async (event) => {
  event.preventDefault()
  console.log(singleBlogId)
  const result = await HTTP.get(`/blog/${singleBlogId.blog_id}`)
  const blogInfo = result.data.data

  const totalComments = blogInfo.Comments.length
  const formattedDate = convertIsoToFormattedData(blogInfo.createdAt)

  headingContainer.innerText = blogInfo.title
  dateContainer.innerText = formattedDate
  totalCommentContainer.innerText = totalComments
  blogImageContainer.innerHTML = `
        <figure class="relative ">
          <img src=${encodeURI(blogInfo.image)} alt="blogImage " class="w-[100%] h-[100%] aspect-square object-cover   ">
          <div class="absolute inset-0 bg-black opacity-45 "></div>
        </figure>`
  blogDescriptionContainer.innerText = blogInfo.description

  const tempBlogResult = await HTTP.get(`/blog`)
  const tempBlogInfo = tempBlogResult.data

  //you may also like section
  const randomBlogResult = await HTTP.get(
    `/blog?page=${Math.ceil(Math.random() * (tempBlogInfo.totalPage - 1))}`
  )
  const randomBlogInfo = randomBlogResult.data.data

  for (let index = 1; index <= 3; index++) {
    blogCardContainer.innerHTML += `
            <div class="mt-7 pt-14 flex gap-6  lg:w-[33%] cursor  ">
                <div class=" mb-10">
                    <figure class="">
                        <a href= '/singleblog?blog_id=${randomBlogInfo[index].blog_id}'>
                        <img src=${encodeURI(randomBlogInfo[index].image)} alt="" class="h-[80%] w-[100%] object-fill opacity-70 hover:opacity-100">
                        </a>
                    </figure>
                    <h2 class="font-bold text-4xl mt-1 sm:m-7">${randomBlogInfo[index].title}</h2>
                    <div class="flex flex-row gap-7 mt-2 text-xl uppercase ">
                        <span class="text-gray-500 uppercase">${convertIsoToFormattedData(randomBlogInfo[0].createdAt)} </span>
                        <span class="text-black">${randomBlogInfo[index].Comments.length} Comments</span>
                    </div>
                </div>
            </div>
        `
  }

  //for mugshot
  const adminResult = await HTTP.get("/aboutme")
  const adminInfo = adminResult.data.data[0]

  authorMugshot.innerHTML = `
    <img src=http://${encodeURI(adminInfo.image)} alt="author" class="author-mugshot w-full h-full rounded-full">
    `

  //for comments
  if (totalComments === 0) {
    commentsContainer.innerHTML += `
        <div class="mt-32 text-center text-xl font-semibold">
           NO COMMENTS...
        </div>
        `
  }
  if (blogInfo.Comments.length > 0) {
    for (let index = 0; index < totalComments; index++) {
      commentsContainer.innerHTML += `
          <div class="mt-10">
            <div class="flex flex-col gap-4">
            <div class= "flex gap-2  items-center">
              <i class="fa-regular fa-circle-user text-4xl "></i>
              <span class="capitalize text-2xl font-bold">${blogInfo.Comments[index].User?.name}</span>
            </div>
            <span class="uppercase text-xs tracking-tight">${convertIsoToFormattedData(blogInfo.Comments[index].createdAt)}</span>
           </div>
           <div class="mt-3 text-gray-500">
           <p class="text-2xl">${blogInfo.Comments[index].comment}</p>
           </div>
          </div>
           `
    }
  }
})

//comment on blog

commentBtn.addEventListener("click", async (event) => {
  event.preventDefault()
  try {
    const userComment = commentInput.value
    if (userComment === "") {
      console.log("cannot comment")

      return
    }
    const result = await HTTP.post(`/blog/${singleBlogId.blog_id}/comment`, {
      comment: userComment,
    })
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
})
