import { Response,Request } from 'express'
import User from '../model/user'
import bcrypt from 'bcrypt'

/**
 * @description signs user in 
 * 
 * @param {object} body 
 * @returns {Promise} promise resolves after user signs-up
 */
export const signup = async(body:any)=>
{
        const SALTROUNDS = 10
        const plainPassword = body.password
        const hashedPw = await bcrypt.hash(plainPassword,SALTROUNDS)
        
        const filteredUserInfo={...body,password:hashedPw}
        const userData = await User.create(filteredUserInfo)
        delete userData.get().password

        return userData
}

/**
 * @description logs user in 
 * 
 * @param {Request}req 
 * @param {Response}res
 *  
 * @returns {Promise} promise resolves after user logs in 
 */
export const login = async(req:Request,res:Response)=>
{
    const {email,password}=req.body
        const doesEmailExist:any = await User.findOne({where:{email}}) 
        if(!doesEmailExist)
        {
            return res.status(404).json({success:false,message:"User Email not found"})
        }
        const userInfo=doesEmailExist.get()
        const doesPasswordMatch= await bcrypt.compare(password,userInfo.password)
        if(!doesPasswordMatch)
        {
            return res.status(401).json({success:false,message:"Password does not match"})
        }
        delete userInfo.password

        return userInfo
}