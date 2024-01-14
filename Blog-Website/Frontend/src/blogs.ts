import HTTP from './urlConfig'
import IBlog from './interface/IBlog'
import queryString from 'query-string'


// variables and constants
const blogsContainer = document.querySelector('.blogs-container') as HTMLDivElement
const paginationContainer = document.querySelector('.pagination-container') as HTMLElement

//event listner
window.addEventListener('load', async () => {
  let blogsInfo = queryString.parse(location.search)
  if (blogsInfo.page === undefined) blogsInfo.page = '1'
  if (blogsInfo.search_term === undefined) blogsInfo.search_term = ''
  try {
    const result = await HTTP.get(`/blog/search?search_term=${blogsInfo.search_term}&page=${blogsInfo?.page}`)
    const totalPage = result.data.totalPage
    const blogs = result.data.data as IBlog[]

    blogs.forEach((res) => {
      blogsContainer.innerHTML += `
      <div class=' relative cursor mb-8 mt-10  mx-1 border  shadow-xl m-auto sm:custom-container'>
      <figure class='relative rounded-lg'>
      <img src=${encodeURI(res.image)} class='w-[100%]  h-[200px] aspect-square object-cover sm:h-[400px] '>
      <div class='absolute inset-0 bg-black opacity-50  rounded-lg hover:opacity-10'></div>
      </figure>
      
      <div class='text-left mt-5 p-5'>
      <h2 class='font-bold text-4xl capitalize  text-gray-800'> ${res.title} </h2>
      <p class=' mt-5 text-xl text-gray-400 line-clamp-5'> ${res.description} </p>
      <a href='/singleblog?blog_id=${res.blog_id}'>
      <button
      class='border uppercase bg-red-300 text-white  rounded-sm p-4 mt-7 text-xl font-semibold w-[150px] hover:bg-black hover:border-none hover:text-white transition-all '>
      Read more
      </button> </a>
      </div>
      </div>
      `
    })

    for (let index = 1; index <= totalPage; index++) {
      paginationContainer.innerHTML += `
      <a href='./blogs?page=${index}'>
      <div class='border cursor p-3 px-5 font-bold text-xl bg-black text-white hover:bg-white hover:text-black '>${index}
      </div>
      </a>
      `
    }
  } catch (error: any) {
    if (error.response.status === 404) {
      console.log('blog not found')
      blogsContainer.innerHTML = `<dotlottie-player src = 'https://lottie.host/d7d0a8a6-c248-44cc-a1ec-ed39d2beda49/zXOluVq7Hg.json'
      background = 'transparent' speed = '1'  loop autoplay class='w-[200px] h-[200px] relative left-[50%] translate-x-[-50%] top-0 m-0' > </dotlottie-player>`

    }

  }
})
