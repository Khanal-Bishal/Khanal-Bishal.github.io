import { Response, Request, NextFunction } from "express";
import path from 'path'

const uploadImage = ( req: Request, res: Response, next: NextFunction) =>
{
 
    if(req.files)
     {
        const image: any = req.files?.image
        const destinationFolder = path.join(__dirname, '../../uploads' )
        const  fileNameWithoutExt = path.basename(image.name).split(".")[0] 
        const filename = Date.now() + fileNameWithoutExt + path.extname(image.name)
        const destinationPath = path.join(destinationFolder, filename)
        
        image?.mv(destinationPath, (err: any) =>
        {
            if (err)
            {
                return res.status(500).json({ message: "error uploading image" })
            }
        })
        
        //@ts-ignore
        req.user = { ...req.user, imageName: filename }
        next()
    }

    else 
    {
        next()
    }
}

export default uploadImage