import express from 'express'

import blogSchema from '../schema/blogSchema'
import * as blogController from '../controller/blog'
import * as commentController from '../controller/comment'

import validateSchema from '../middlewares/validateSchema'
import uploadImage from '../middlewares/uploadImage'

import checkAuthentication from '../middlewares/checkAuthentication'
import { isAdmin, isUser } from '../middlewares/checkRole'

const router = express.Router()

/**
 * @description blog routes
 * 
 * @route  /api/blog
 */
router.get('/search', blogController.searchBlog)
router.get('/', blogController.getAllBlog);
router.get('/:id', blogController.getSingleBlog)

router.post('/', checkAuthentication, isAdmin, uploadImage, validateSchema(blogSchema), blogController.createBlog)
router.put('/:id', checkAuthentication, isAdmin, uploadImage, validateSchema(blogSchema), blogController.updateBlog)
router.delete('/:id', checkAuthentication, isAdmin, blogController.deleteBlog)

//comment related routes 
router.get('/:id/comment', commentController.getCommentByBlogId)
router.post('/:id/comment', checkAuthentication, commentController.createComment)

export default router