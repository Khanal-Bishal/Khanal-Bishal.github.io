import express from 'express'

import blogSchema from '../schema/blogSchema'
import { getAllBlog,getSingleBlog,createBlog,deleteBlog,updateBlog,searchBlog } from '../controller/blog'

import validateSchema from '../middlewares/validateSchema'
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

router.post( '/', checkAuthentication, isAdmin, validateSchema(blogSchema), createBlog)

router.put ( '/:id', checkAuthentication, isAdmin, validateSchema(blogSchema), updateBlog)

router.delete ( '/:id', checkAuthentication, isAdmin, deleteBlog)



export default router