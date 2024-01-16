import { JwtPayload } from "jsonwebtoken";
import { Request } from 'express'

export default interface AuthenticatedRequest extends Request {
    user?: JwtPayload

}