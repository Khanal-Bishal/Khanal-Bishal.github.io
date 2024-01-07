import { Request, Response, NextFunction } from "express";
import * as profileService from '../services/profile'

export const getProfile = async (req: Request, res: Response, next: NextFunction) =>
{
      try
    {
       
        let adminInfo = await profileService.getProfile()

        if ( adminInfo.length === 0 )
        {
            return res.status(404).json( { success:false, message:"Profile not found. Create one"} )
        }
        
        res.status(200).json({ success:true, data: adminInfo })
    }
    catch(error)
    {
        next(error)
    }
}

export const createProfile = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {   
        //@ts-ignore
        const imageName = req.user.imageName 
        let adminInfo =  await profileService.createProfile(req.body, imageName)
        adminInfo = adminInfo?.toJSON()!
        res.status(201).json({ success: true, data: adminInfo })
    }
    catch(error)
    {
        next(error)
    }
}

export const updateProfile =async (req: Request, res: Response, next: NextFunction) =>
{
 
    try
    {
        const blog_id = req.params.id
        //@ts-ignore
       const imageName = req.user.imageName 
        const updatedProfile = await profileService.updateProfile(req.body, blog_id , imageName)
        if(!updatedProfile)
        {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }
        
        res.status(200).json({ success: true, data: updatedProfile })
    }
    catch (error)
    {
        next(error)
    }
}