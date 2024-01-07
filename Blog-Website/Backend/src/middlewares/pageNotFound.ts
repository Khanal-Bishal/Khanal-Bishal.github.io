import { Request,Response,NextFunction } from "express"

 const pageNotFound = (req: Request, res: Response, next: NextFunction) =>
{
    res.status(404).json({success: false, message: "Page not found" })
}

export default pageNotFound