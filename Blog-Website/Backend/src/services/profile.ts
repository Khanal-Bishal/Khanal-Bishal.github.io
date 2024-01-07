import IProfile from '../interfaces/IProfile'
import Profile from '../model/profile'

export const getProfile = async() =>
{
    let  adminInfo = await Profile.findAll()
    return adminInfo
}

export const createProfile = async (body: IProfile, imageName: string) =>
{
    let adminInfo = await Profile.create({...body, image: imageName})
    return adminInfo
}


export const updateProfile = async (body: IProfile, profile_id: string, imageName: string) =>
{
     const doesProfileExist =  await Profile.findByPk(profile_id) 
        
        if(!doesProfileExist)
        {
            return doesProfileExist
        }
        const [rowCount, [updatedProfile]] = await Profile.update({ ...body, image: imageName }, { where: { profile_id }, returning: true });
        updatedProfile.get()
        return updatedProfile
}