import express from 'express'

import blogSchema from '../schema/blogSchema'
import { getAllBlog,getSingleBlog,createBlog,deleteBlog,updateBlog,searchBlog } from '../controller/blog'

import validateSchema from '../middlewares/validateSchema'
import uploadImage from '../middlewares/uploadImage'

import multer from 'multer'
import checkAuthentication from '../middlewares/checkAuthentication'
import { isAdmin, isUser } from '../middlewares/checkRole'
    
const router = express.Router()

/**
 * @description blog routes
 * 
 * @route  /api/blog
 */

router.get('/search', searchBlog)
router.get('/',  getAllBlog);
router.get( '/:id', getSingleBlog)

router.post( '/', checkAuthentication, isAdmin, uploadImage, validateSchema(blogSchema), createBlog)

router.put ( '/:id', checkAuthentication, isAdmin, uploadImage, validateSchema(blogSchema), updateBlog)

router.delete ( '/:id', checkAuthentication, isAdmin, deleteBlog)



export default router