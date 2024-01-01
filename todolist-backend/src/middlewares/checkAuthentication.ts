import { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const checkAuthentication = (req:Request,res:Response,next:NextFunction)=>
{
    if(req.headers.authorization)
    {
        let token= req.headers.authorization.split(" ")[1]
        if(token)
        {
            if(process.env.JWT_SECRET)
            {
                try{

                    let decodedUserInfo=jwt.verify(token,process.env.JWT_SECRET) as any  
                    if(decodedUserInfo)
                    {                        
                        //@ts-ignore
                        req.user=decodedUserInfo
                        return next()
                    }
                }catch (err)
                {

                }
            }
        }  
    }
    res.status(401).json({success:false,message:"Unauthenticated"})
}
export default checkAuthentication