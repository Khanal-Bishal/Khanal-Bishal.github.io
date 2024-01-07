import { Request,Response,NextFunction } from "express";
import { ErrorObj } from "../interfaces/errorObj";

const validateSchema = (Schema: any) =>
{   
    
    return (req: Request, res: Response, next: NextFunction) =>
    {
        
        const { error } = Schema.validate(req.body, { abortEarly: false,stripUnknown: true })
        if(error)
        {            
             let errArr:ErrorObj[] = [] 
            //@ts-ignore
            error.details.forEach(err =>
                {
                    let errObj: ErrorObj =
                    {
                    params: err.path[0],
                    message: err.message
                    }
                    errArr.push(errObj)
                })
            return res.status(401).json({ success:false, error:errArr })
        }
        else 
        {
            next()
        }
    }
}

export default validateSchema
