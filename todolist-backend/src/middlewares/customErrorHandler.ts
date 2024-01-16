import { Request, Response, NextFunction } from 'express'
type ErrorObj = {
    params: string;
    message: string
}
const customErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let status = 500
    let errorArr: ErrorObj[] = []
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        status = 401

        err?.errors.forEach((validation_err: any) => {
            let errObj: ErrorObj =
            {
                params: validation_err.path,
                message: validation_err.message,
            }
            errorArr.push(errObj)
        })
    }
    res.status(status).json({ success: false, errorType: errorArr })
}
export default customErrorHandler

