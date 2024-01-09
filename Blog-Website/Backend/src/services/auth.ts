import { Response,Request } from 'express'
import IUser from '../interfaces/IUser'
import User from '../model/user'
import bcrypt from 'bcrypt'

/**
 * @description signs user in 
 * 
 * @param {object} body 
 * @returns {Promise} promise resolves after user signs-up
 */
export const signup = async(body: IUser)=>
{
        const SALTROUNDS = 10
        const plainPassword = body.password
        const hashedPw = await bcrypt.hash(plainPassword,SALTROUNDS)
        
        const filteredUserInfo = { ...body, password: hashedPw }
        
        const userData = await User.create(filteredUserInfo)
        delete userData.get().password

        return userData
}

/**
 * @description logs user in 
 * 
 * @param {Request} req 
 * @param {Response} res
 *  
 * @returns {Promise} promise resolves after user logs in 
 */
export const login = async(email: string, password: string)=>
{
    
    const doesEmailExist: any = await User.findOne({ where: { email } }) 
    return doesEmailExist
}