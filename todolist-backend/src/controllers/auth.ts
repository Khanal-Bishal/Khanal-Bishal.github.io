import { NextFunction,Request,Response } from "express";

import * as authService from '../services/auth'

//@desc signs up a new user
//@route POST /api/user/signup
export const signup=async(req:Request,res:Response,next:NextFunction)=>
{
    try 
    {   
        let userData=await authService.signup(req.body)
        return res.status(200).json({success:true,userData,message:"User created"})
    }

    catch(error)
    {
        next(error)
    }
}

//@desc logs user in 
//@route POST /api/user/login
export const login = async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        let data=await authService.login(req.body)
        if (data)
        {
            return res.status(200).json({success:true,message:"User logged in",userData:data.userInfo,accessToken:data.accessToken,refreshToken:data.refreshToken})
        }
        res.status(401).json({success:false,message:"Invalid credentials"})
    }
    catch (err)
    {
        res.json({err})
        // next(err)
    }
}

//@desc generates new access token after initial access token expires
//@routes POST /api/user/token
import jwt from 'jsonwebtoken'
export const generateAccessToken= async (req:Request,res:Response,next:NextFunction)=>
{
    try
    {
        const { refreshToken } = req.body;
        
        if (!refreshToken)
        {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
       
        const decodedUserInfo =await  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string)
        
        if (!decodedUserInfo) 
        {
            return res.status(401).json({ message: "Invalid refresh token" });
        }
        let accessToken= await jwt.sign(decodedUserInfo, process.env.JWT_SECRET as string )   
        res.json({ success:true,accessToken });
    }
    catch(error)
    {
        next(error)
    }
}



