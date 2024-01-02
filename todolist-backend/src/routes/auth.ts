import express,{Request,Response,NextFunction} from 'express'

import {signup,login,generateAccessToken} from '../controllers/auth'
import { loginSchema,signupSchema } from '../schema/authSchema'
import validateSchema from '../middlewares/validateSchema'


const router=express.Router()

//@route /api/user
router.post('/signup',validateSchema(signupSchema),signup)
router.post('/login',validateSchema(loginSchema),login) 
router.post('/token',generateAccessToken)

export default router
