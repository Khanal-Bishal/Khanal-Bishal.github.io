import express from "express";
import * as controllerAuth from '../controller/auth'
import { signUpSchema,loginSchema } from "../schema/authSchema";
import validateSchema from "../middlewares/validateSchema";

const router= express.Router()

router.post('/signup', validateSchema(signUpSchema), controllerAuth.signup)
router.post('/login', validateSchema(loginSchema), controllerAuth.login)
router.post('/token', controllerAuth.generateAccessToken)

export default router