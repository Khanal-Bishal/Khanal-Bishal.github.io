import { Request, Response, NextFunction } from 'express'
import { ADMIN, USER } from '../constants/role'
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest'

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.user
        if (userInfo?.role != ADMIN) {
            return res.status(403).json({ success: false, message: "Forbidden. Must be admin" })
        }
        next()
    }
    catch (error) {
        next(error)
    }
}

export const isUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userInfo = req.user
    if (userInfo?.role != USER) {
        return res.status(403).json({ success: false, message: "Forbidden. Must be user" })
    }
    next()
}

