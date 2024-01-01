import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../models/user";

export const signup = async(body:any)=>
{
        const saltRounds=10
        const plainPassword=body.password
        const hashedPassword=await bcrypt.hash(plainPassword, saltRounds)

        let userData=await User.create({...body,password:hashedPassword})
        userData= userData.get({plain:true});
        //@ts-ignore
        delete userData.password
        return userData;
}


export const login = async(body:any)=>
{
const doesEmailExist=await User.findOne({where:{email:body.email}})
    //@ts-ignore
    if(doesEmailExist) 
    {
        let userInfo=doesEmailExist.get()
        let didMatch= await bcrypt.compare(body.password, userInfo.password)
        if(didMatch)
        {
            delete userInfo.password
            let jwtSecretKey=process.env.JWT_SECRET  
            if(jwtSecretKey)
            {
                let token= await jwt.sign(userInfo, jwtSecretKey )
                return ({userInfo,token})                
            }
            
        }
    }

}