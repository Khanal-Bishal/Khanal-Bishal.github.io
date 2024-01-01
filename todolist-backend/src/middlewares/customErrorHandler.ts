import {Request,Response,NextFunction} from 'express'
const customErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>
{
    type ErrorObj={
    params:string;
    message:string
    }
    
    
    let status=500
    let errorArr:ErrorObj[]=[]
    if(err.name==="SequelizeValidationError" || "SequelizeUniqueConstraintError")
    {
        status=401
        //@ts-ignore
        err?.errors.forEach(validation_err => {
        let errObj: ErrorObj = {
        params: validation_err.path,
        message: validation_err.message,  
        }
        errorArr.push(errObj) 

})  
}



    res.status(status).json({success:false,errorType:errorArr})
}
export default customErrorHandler

