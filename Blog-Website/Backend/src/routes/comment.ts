import express from 'express'
import * as commentController from '../controller/comment'

import commentSchema from '../schema/commentSchema'

import validateSchema from '../middlewares/validateSchema'
import checkAuthentication from '../middlewares/checkAuthentication'
import { isAdmin } from '../middlewares/checkRole'

const router = express.Router()

router.get('/', commentController.getComments)
router.put('/:id', checkAuthentication, validateSchema(commentSchema), commentController.updateComment)
router.delete('/:id', checkAuthentication, isAdmin, commentController.deleteComment)

export default router