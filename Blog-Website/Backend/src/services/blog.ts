import Blog from '../model/blog'
import User from '../model/user'
import Comment from '../model/comment'
import { Op } from 'sequelize'
import IBlog from '../interfaces/IBlog'
import { LIMIT } from '../constants/blogConstants'


export const getAllBlog = async (page: number) => {
    let offset = (page - 1) * LIMIT
    let blogsInfo = await Blog.findAll({
        limit: LIMIT, offset,
        include:
            [
                { model: User, attributes: ['name', 'email'] },
                {
                    model: Comment,
                    attributes: ['comment_id', 'comment', 'user_id', 'rating'],
                    include: [{ model: User, attributes: ['name', 'email'] }]
                }
            ],
        order: [['blog_id', 'ASC']]
    })
    let blogsCount = await Blog.count()

    return { blogsInfo, blogsCount }
}

export const getSingleBlog = async (blog_id: string) => {
    const blogInfo = await Blog.findOne({
        where: { blog_id },
        include:
            [
                { model: User, attributes: ['name', 'email'] },
                {
                    model: Comment,
                    attributes: ['comment_id', 'comment', 'user_id', 'rating', 'createdAt'],
                    include: [{ model: User, attributes: ['name', 'email'] }]
                }
            ]
    })
    return blogInfo
}

export const createBlog = async (body: IBlog, imageName: string, admin_id: string) => {
    const blogInfo = await Blog.create({ ...body, image: imageName, admin_id })
    return blogInfo
}

export const updateBlog = async (body: IBlog, blog_id: string, imageName: string) => {
    const doesBlogExist = await Blog.findByPk(blog_id)

    if (!doesBlogExist) {
        return doesBlogExist
    }
    const [rowCount, [updatedBlog]] = await Blog.update({ ...body, image: imageName }, { where: { blog_id }, returning: true })
    updatedBlog.get()

    return updatedBlog
}

export const deleteBlog = async (blog_id: string) => {
    const doesBlogExist = await Blog.findByPk(blog_id)

    if (!doesBlogExist) {
        return doesBlogExist
    }
    return await Blog.destroy({ where: { blog_id } })
}

/**
 * 
 * @param {number} page 
 * @param {string} search_term 
 * @returns 
 */
export const searchBlog = async (page: number, search_term: string) => {
    const offset = (page - 1) * LIMIT
    const blogsInfo = await Blog.findAll({
        where:
        {
            [Op.or]:
                [
                    { 'title': { [Op.iLike]: `%${search_term}%` } },
                    { 'description': { [Op.iLike]: `%${search_term}%` } },
                ],
        }, limit: LIMIT, offset
    })
    const blogsCount = await Blog.count(
        {
            where:
            {
                [Op.or]:
                    [
                        { 'title': { [Op.iLike]: `%${search_term}%` } },
                        { 'description': { [Op.iLike]: `%${search_term}%` } },

                    ],
            }
        })
    return { blogsInfo, blogsCount }
}