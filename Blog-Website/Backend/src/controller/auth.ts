import {Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


import * as authService from '../services/auth'
import { ACCESS_TOKEN_EXPIRY,REFRESH_TOKEN_EXPIRY } from '../constants/jwtExpiry'
/**
 * @description signs up a new user
 * @route POST /api/user/signup
 * 
 * @param  {Request} req 
 * @param { Response} res 
 * @param {NextFunction}next
 * 
 *  @returns {Promise} Promise that resolves when user signup successfully
 */
export const signup = async(req:Request,res:Response,next:NextFunction)=>
{
    try
    {   
        const userData=await authService.signup(req.body)
        res.status(201).json({success:true,message:"User signed in successfully",data:userData})  
    }
    catch(error)
    {
        next(error)
    }
}

/**
 * @description login a  user
 * @route POST /api/user/login
 * 
 * @param  {Request} req 
 * @param { Response} res 
 * @param {NextFunction}next
 * 
 *  @returns {Promise} Promise that resolves when user logs in  successfully
 */
export const login = async(req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const { email, password } = req.body
        const doesEmailExist = await authService.login(email, password)
        if(!doesEmailExist)
        {
            return res.status(404).json({ success: false, message: "User Email not found" })
        }
        const userInfo = doesEmailExist.get()
        const doesPasswordMatch = await bcrypt.compare(password, userInfo.password)
        if(!doesPasswordMatch)
        {
            return res.status(401).json({ success:false, message: "Password does not match" })
        }
        delete userInfo.password
        const accessToken = jwt.sign(userInfo , process.env.JWT_SECRET as string, { expiresIn: ACCESS_TOKEN_EXPIRY })
        const  refreshToken = jwt.sign(userInfo, process.env.JWT_REFRESH_SECRET as string, { expiresIn: REFRESH_TOKEN_EXPIRY })
        res.status(200).json({ success:true, message:"user logged successfully", data: userInfo, accessToken,refreshToken })
    }
    catch(error)
    {
        next(error)
    }
}

/**
 * @description generates access token by using refresh token
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 * 
 */
export const generateAccessToken = async(req: Request, res: Response, next: NextFunction)=>
{
    try 
    {
        const {refreshToken} = req.body
        if(!refreshToken)
        {
            return res.status(401).json({ message:"Invalid refresh token" })
        }
        const decodeUserInfo = await jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET as string) 

        if(!decodeUserInfo)
        {
            return res.status(401).json({ message: "User doesn't exist" })
        }
        
        let accessToken = await jwt.sign(decodeUserInfo,process.env.JWT_SECRET as string)
        res.json({ success:true, accessToken })
    }
    catch (error)
    {
        res.status(401).json({ success: false, error })
        
    }
}
