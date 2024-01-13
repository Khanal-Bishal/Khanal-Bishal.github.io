import {Request,Response,NextFunction} from 'express'

const customErrorHandler = (error: any,req: Request,res:Response,next: NextFunction)=>
{
    let status = 500
    let message = "Internal server error"
    if(error.name === "SequelizeValidationError" || error.name ==="SequelizeUniqueConstraintError") 
    {
        status = 400
        let errArr: any[] = []
        //@ts-ignore
        error?.errors.forEach( err =>
            {
                let errObj = {
                    params:err.path,
                    message:err.message
                }
                errArr.push(errObj)
                
            })
            return res.status(status).json({ success: false, error: errArr })
    }
    
    return res.status(status).json({ success: false, message})

}

export default customErrorHandler