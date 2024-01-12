import HTTP from "./urlConfig"

export const getRandomBlogs = async (totalPage: number) =>
{
    const randomBlogs = await HTTP.get(`./blog?page=${Math.ceil(Math.random()*totalPage)}`)
    return randomBlogs.data.data
}

export const getBlog = async (page?: number ) =>
{
    const blogs = await HTTP.get(`./blog?page=${page}`)
    return blogs.data.data
}

export const getSingleRandomBlog = async (totalPage: number) =>
{
    const randomBlogs = await HTTP.get(`./blog?page=${Math.ceil(Math.random()*totalPage)}`)
    return randomBlogs.data.data[Math.ceil(Math.random()*4)]
}