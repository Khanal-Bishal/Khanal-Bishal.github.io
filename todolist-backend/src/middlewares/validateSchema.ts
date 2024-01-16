import { Request, Response, NextFunction } from "express"

type ErrorObj = {
    params: string;
    message: string
}

const validateSchema = (Schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = Schema.validate(req.body, { abortEarly: false, stripUnknown: true })
        if (error) {
            let errArr: ErrorObj[] = []

            error.details.forEach((err: any) => {
                let errObj: ErrorObj =
                {
                    params: err.path[0],
                    message: err.message
                }
                errArr.push(errObj)
            })
            return res.status(401).json({ success: false, errorType: errArr })
        }
        else {
            next()
        }
    }
}

export default validateSchema