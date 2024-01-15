import { Request, Response, NextFunction } from "express";
import * as profileService from '../services/profile'
import DOMAIN from "../constants/domain";
import AuthenticatedRequest from "../interfaces/AuthenticatedRequest";


export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let adminInfo = await profileService.getProfile()

        if (adminInfo.length === 0) {
            return res.status(404).json({ success: false, message: "Profile not found. Create one" })
        }
        const plainAdminInfo = adminInfo.map(info => {
            info = info.get({ plain: true })
            //@ts-ignore
            const imageUrl = `${DOMAIN}/image/${info.image}`
            return { ...info, image: imageUrl }
        })

        res.status(200).json({ success: true, data: plainAdminInfo })
    }
    catch (error) {
        next(error)
    }
}

export const createProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const imageName = req.user?.imageName
        let adminInfo = await profileService.createProfile(req.body, imageName)
        adminInfo = adminInfo?.toJSON()!
        res.status(201).json({ success: true, data: adminInfo })
    }
    catch (error) {
        next(error)
    }
}

export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const blog_id = req.params.id
        const imageName = req.user?.imageName
        const updatedProfile = await profileService.updateProfile(req.body, blog_id, imageName)
        if (!updatedProfile) {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }
        res.status(200).json({ success: true, data: updatedProfile })
    }
    catch (error) {
        next(error)
    }
}