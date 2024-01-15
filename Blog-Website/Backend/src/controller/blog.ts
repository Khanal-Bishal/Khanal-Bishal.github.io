import { Request, Response, NextFunction } from 'express'
import Blog from '../model/blog'
import * as blogService from '../services/blog'
import { LIMIT } from '../constants/blogConstants'
import DOMAIN from '../constants/domain'
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest'
import IBlog from '../interfaces/IBlog'

/**
 * @description get all the existing blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route  GET /api/blog
 */
export const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const { blogsInfo, blogsCount } = await blogService.getAllBlog(page)
        const totalPage = Math.ceil(blogsCount / LIMIT)
        if (blogsInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Blogs not found" })
        }
        const plainBlogInfo = blogsInfo.map(info => {
            info = info.get({ plain: true })
            //@ts-ignore
            const imageUrl = `http://${DOMAIN}/image/${info?.image}`
            return { ...info, image: imageUrl }
        })
        res.status(200).json({ success: true, blogsCount, totalPage, data: plainBlogInfo })
    }
    catch (error) {
        next(error)
    }
}

/**
 * @description gets the specified blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route  GET /api/blog/:id
 */
export const getSingleBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog_id = req.params.id
        let blogInfo = await blogService.getSingleBlog(blog_id) as any
        blogInfo = blogInfo?.toJSON()!
        if (!blogInfo) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        blogInfo = { ...blogInfo, image: `http://${DOMAIN}/image/${blogInfo.image}` }
        res.status(200).json({ success: true, data: blogInfo })
    }
    catch (error) {
        next(error)
    }
}

/**
 * @description create new blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 * @route POST /api/blog
 */
export const createBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const imageName = req.user?.imageName
        const admin_id = req.user?.user_id
        let blogInfo = await blogService.createBlog(req.body, imageName, admin_id)
        blogInfo = blogInfo.toJSON()
        res.status(201).json({ success: true, data: blogInfo })
    }
    catch (error) {
        next(error)
    }
}

/**
 * @description updates the existing blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route  PUT /api/blog/:id
 */
export const updateBlog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        const imageName = req.user?.imageName
        const blog_id = req.params.id
        const updatedBlog = await blogService.updateBlog(req.body, blog_id, imageName)

        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }
        res.status(200).json({ success: true, data: updatedBlog })
    }
    catch (error) {
        next(error)
    }
}

/**
 * @description deletes the specified blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route DELETE /api/blog/:id
 */
export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blog_id = req.params.id
        const blogDeleted = await blogService.deleteBlog(blog_id)

        if (!blogDeleted) {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        res.status(204).end()  //kept .end as server kept on spinning even tho 204 returns nothing
    }
    catch (error) {
        next(error)
    }
}
/**
 * @description searches the blog either by title or description
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {Response} next 
 * @route GET /api/blog/search
 */
export const searchBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt(req.query.page as string) || 1
        const search_term = req.query.search_term as string || " "
        const { blogsInfo, blogsCount } = await blogService.searchBlog(page, search_term)
        const totalPage = Math.ceil(blogsCount / LIMIT)
        if (blogsInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Blogs not found" })
        }
        const plainBlogInfo = blogsInfo.map(info => {
            info = info.get({ plain: true })
            //@ts-ignore
            const imageUrl = `http://${DOMAIN}/image/${info.image}`
            return { ...info, image: imageUrl }
        })
        res.status(200).json({ success: true, blogsCount, totalPage, data: plainBlogInfo })
    }
    catch (error) {
        next(error)
    }
}

