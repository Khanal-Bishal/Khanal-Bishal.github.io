import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../models/user";
import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from '../constants/tokenExpiry';

/**
 * @description creates new user into the database 
 * @param body 
 * @returns userData
 */
export const signup = async (body: any) => {
    const saltRounds = 10
    const plainPassword = body.password
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)

    let userData = await User.create({ ...body, password: hashedPassword })
    userData = userData.get({ plain: true });
    //@ts-ignore
    delete userData.password
    return userData;
}

/**
 * @description logs user into the system after checking email and password
 * @param body 
 * @returns object
 */

export const login = async (body: any) => {
    const doesEmailExist = await User.findOne({ where: { email: body.email } })

    if (doesEmailExist) {
        let userInfo = doesEmailExist.get()
        let didMatch = await bcrypt.compare(body.password, userInfo.password)
        if (didMatch) {
            delete userInfo.password
            let jwtSecretKey = process.env.JWT_SECRET as string
            let refreshKTokenSecret = process.env.JWT_REFRESH_SECRET as string

            let accessToken = await jwt.sign(userInfo, jwtSecretKey, { expiresIn: ACCESS_TOKEN_EXPIRY })
            let refreshToken = await jwt.sign(userInfo, refreshKTokenSecret, { expiresIn: REFRESH_TOKEN_EXPIRY })

            return ({ userInfo, accessToken, refreshToken })
        }
    }
}




