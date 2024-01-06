import { Request, Response, NextFunction } from 'express'
import { ADMIN, USER } from '../constants/role'


export const isAdmin = async(req: Request, res: Response, next: NextFunction) =>
{
    try 
    {
        //@ts-ignore
        const userInfo = req.user
        if(userInfo.role != ADMIN)
        {
            return res.status(403).json({ success:false, message: "Forbidden. Must be admin" })
        }
        next()
        
    }
    catch (error)
    {
        next(error)
    }
}

export const isUser = async(req: Request, res:Response, next: NextFunction) =>
{
    //@ts-ignore 
    const userInfo = req.user

    if(userInfo.role != USER)
    {
        return res.status(403).json({ success:false, message: "Forbidden. Must be user" })
    }
    next()
}

