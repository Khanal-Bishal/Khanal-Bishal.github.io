import express from 'express'

import blogSchema from '../schema/blogSchema'
import { getAllBlog,getSingleBlog,createBlog,deleteBlog,updateBlog,searchBlog } from '../controller/blog'

import validateSchema from '../middlewares/validateSchema'
import checkAuthentication from '../middlewares/checkAuthentication'




const router = express.Router()



/**
 * @description blog routes
 * 
 * @route  /api/blog
 */

router.get('/search',searchBlog)
router.get('/',  getAllBlog);
router.get( '/:id', getSingleBlog)

router.post( '/', checkAuthentication, validateSchema(blogSchema), createBlog)

router.put ( '/:id', checkAuthentication,validateSchema(blogSchema), updateBlog)

router.delete ( '/:id',checkAuthentication, deleteBlog)



export default router