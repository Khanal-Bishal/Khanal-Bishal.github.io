import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthenticatedRequest from '../interfaces/AuthenticatedRequest'

const checkAuthentication = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthenticated. No token found' })
    }
    let decodedUserInfo = await jwt.verify(token, process.env.JWT_SECRET as string)

    if (!decodedUserInfo) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthenticated. Invalid token' })
    }

    req.user = decodedUserInfo as JwtPayload
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: error.message })
    } else if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: error.message })
    } else {
      next(error)
    }
  }
}

export default checkAuthentication






