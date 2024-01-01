import { NextFunction,Request,Response } from "express";

import * as authService from '../services/auth'

//@desc signs up a new user
//@route /api/user/signup
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
//@route /api/user/login
export const login = async (req:Request,res:Response,next:NextFunction)=>
{
        let data=await authService.login(req.body)
        if (data)
        {
            return res.status(200).json({success:true,message:"User logged in",userData:data.userInfo,token:data.token})
        }
    res.status(401).json({success:false,message:"Invalid credentials"})
}


