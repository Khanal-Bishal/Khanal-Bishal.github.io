import express,{Request,Response,NextFunction} from 'express'

import {signup,login} from '../controllers/auth'
import { loginSchema,signupSchema } from '../models/authSchema'
import validateSchema from '../middlewares/validateSchema'


const router=express.Router()

//@route /api/user
router.post('/signup',validateSchema(signupSchema),signup)
router.post('/login',validateSchema(loginSchema),login) 

export default router
