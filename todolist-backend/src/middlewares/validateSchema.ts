import { Request,Response,NextFunction } from "express"
const validateSchema= (Schema:any)=>
{
    return(req:Request,res:Response,next:NextFunction)=>
    {
        const {error}=Schema.validate(req.body,{abortEarly:false,stripUnknown:true})
        if(error)
            {  
             type ErrorObj={
                    params:string;
                    message:string
             }
            let errArr:ErrorObj[]=[] 
            //@ts-ignore
            error.details.forEach(err=>
                {
                    let errObj:ErrorObj={
                        params:err.path[0],
                        message:err.message
                    }
                    errArr.push(errObj)
                })
            return res.status(401).json({success:false,errorType:errArr})
        }
        else 
        {
            next()
        }
    }
}

export default validateSchema