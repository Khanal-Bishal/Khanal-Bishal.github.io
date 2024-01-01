import {Response,Request,NextFunction } from 'express'

//@desc handles resource not found
//@route route doesn't exist
const pathNotFound= (req:Request,res:Response)=>
{
    res.status(404).json({message:"Resource not found"})
}
export default pathNotFound