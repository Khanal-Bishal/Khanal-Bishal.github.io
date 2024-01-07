import {Request, Response, NextFunction } from 'express'
import Blog from '../model/blog'
import * as blogService from '../services/blog'
import { LIMIT } from '../constants/blogConstants'

/**
 * @description get all the existing blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route  GET /api/blog
 */
export const getAllBlog = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        let page = parseInt(req.query.page as string) || 1
        let {blogsInfo, blogsCount} = await blogService.getAllBlog(page)
        let totalPage = Math.ceil(blogsCount/LIMIT)
        if ( blogsInfo.length === 0 )
        {
            return res.status(404).json( { success:false, message:"Blogs not found"} )
        }
        
        res.status(200).json({success:true,blogsCount,totalPage,data: blogsInfo})
    }
    catch(error)
    {
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
export const getSingleBlog = async(req: Request, res: Response, next: NextFunction) =>
{
    try
    {

        const blog_id = req.params.id
        let blogInfo = await blogService.getSingleBlog( blog_id)
        blogInfo = blogInfo?.toJSON()!
        if(!blogInfo)
        {
            return res.status(404).json({success: false, message: "Blog not found" })
        } 
        res.status(200).json({success: true, data: blogInfo})
    }
    catch(error)
    {
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
export const createBlog = async (req : Request, res : Response, next : NextFunction) =>
{
    try
    {   //@ts-ignore
        const imageName = req.user.imageName
        console.log(req.files?.image);
        let blogInfo = await blogService.createBlog(req.body, imageName)
        blogInfo = blogInfo.toJSON()
        res.status(201).json({ success: true,data: blogInfo  })
    }
    catch(error)
    {
        next(error)
    }
}

/**
 * @description updated the existing blog
 * 
 * @param { Request } req 
 * @param { Response } res 
 * @param { NextFunction } next 
 * 
 *  @route  PUT /api/blog/:id
 */
export const updateBlog = async(req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        //@ts-ignore
        const imageName = req.user.imageName
        const blog_id = req.params.id
        const updatedBlog = await blogService.updateBlog(req.body, blog_id, imageName )

         if(!updatedBlog)
        {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        res.status(200).json({ success: true, data: updatedBlog })
    }
    catch (error)
    {
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
export const deleteBlog = async( req: Request, res: Response, next: NextFunction) =>
{
       try
    {
        const blog_id = req.params.id
        const blogDeleted =  await blogService.deleteBlog(blog_id)
        
        if(!blogDeleted)
        {
            return res.status(404).json({ success: false, message: "Blog not found" })
        }

        res.status(204).end()  //kept .end as server kept on spinning even tho 204 returns nothing
    }
    catch (error)
    {
        next(error)
    }
}


export const searchBlog =  async(req: Request, res: Response, next: NextFunction)=>
{
     try
    {   
        let page = parseInt(req.query.page as string) || 1
        let search_term = req.query.search_term as string || ""
        let {blogsInfo, blogsCount} = await blogService.searchBlog(page,search_term)
        let totalPage = Math.ceil(blogsCount/LIMIT)
        if ( blogsInfo.length === 0 )
        {
            return res.status(404).json( { success:false, message:"Blogs not found"} )
        }
        
        res.status(200).json({success:true,blogsCount,totalPage,data:blogsInfo})
    }
    catch(error)
    {
        next(error)
    }
}

