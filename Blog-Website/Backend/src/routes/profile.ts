import express from 'express'
const router = express.Router()

import { getProfile, createProfile, updateProfile } from '../controller/profle'

import profileSchema from '../schema/pofileSchema'

import validateSchema from '../middlewares/validateSchema'
import checkAuthentication from '../middlewares/checkAuthentication'
import { isAdmin } from '../middlewares/checkRole'
import uploadImage from '../middlewares/uploadImage'

router.get('/', getProfile)
router.post('/', checkAuthentication, isAdmin, uploadImage, validateSchema(profileSchema), createProfile)
router.put('/:id', checkAuthentication, isAdmin, uploadImage, validateSchema(profileSchema), updateProfile)

export default router
