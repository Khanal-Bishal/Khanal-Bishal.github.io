import HTTP from './urlConfig'
import { LIMIT } from './constants'

export const getRandomBlogs = async (totalPage: number) => {
  if (totalPage <= 1) {
    const randomBlogs = await HTTP.get(`./blog?page=1`)
    return randomBlogs.data.data
  }
  const randomBlogs = await HTTP.get(
    `./blog?page=${Math.ceil(Math.random() * (totalPage - 1))}`
  )
  return randomBlogs.data.data
}

export const getBlog = async (page?: number) => {
  const blogs = await HTTP.get(`./blog?page=${page}`)
  return blogs.data.data
}

export const getSingleRandomBlog = async (totalPage: number) => {
  const randomPage = Math.ceil(Math.random() * (totalPage - 1))
  const randomBlogs = await HTTP.get(`./blog/?page=${randomPage}`)

  const randomBlogIndex = Math.ceil(Math.random() * LIMIT) - 1
  const randomBlog = randomBlogs.data.data[randomBlogIndex]
  return randomBlog
}
/**
 * @description logs user out from the system
 */
export const logout = () => {
  localStorage.removeItem('userInfo')
  setTimeout(() => {
    window.location.href = '../login'
  }, 200)
}
