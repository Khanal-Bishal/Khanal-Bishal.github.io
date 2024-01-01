import { Response,Request,NextFunction } from "express"

import Task from "../models/task"
import * as taskService from '../services/task'

//@desc fetches all tasks from todoDb
//@route  GET /api/task/
export const getTasks=( async(req:Request,res:Response,next:NextFunction)=>
{
    const taskInfo= await taskService.getTasks() as any
    if(taskInfo.length>0)
    {
      return res.status(200).json({success:true,tasks:taskInfo})
    }
    res.status(400).json({success:false,message:"No data"})
})

//@desc creates new task into the db
//@route POST /api/task
export const createTask=(async(req:Request,res:Response,next:NextFunction)=>
{  
    try
    {
        const data =  await taskService.createTask(req.body)
        if (data)
        {
         return res.status(200).json({success:true,message:"New task added into the list",data})
        }
    }
    catch(error)
    { 
        next(error)
    }
})  

//@desc updates the tasks 
//@route PUT /api/task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedData = await taskService.updateTask(req)

    if (updatedData.rowCount === 0) {
      // No task was updated (possibly the task with the given ID doesn't exist)
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task updated', updatedTask:updatedData.updatedTask});
  } 
  catch (err) {
    next(err)   
  }
};

//@desc updates the tasks 
//@route DELETE /api/task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedRowCount = await taskService.deleteTask(req)

    if (deletedRowCount != 0) {
        return res.status(204).json({success:true});
    }
    else 
    {
        return res.status(404).json({ success: false, message: 'No task found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    next(error); 
  }
};

