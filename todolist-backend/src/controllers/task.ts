import { Response,Request,NextFunction } from "express"

import Task from "../models/task"
import * as taskService from '../services/task'

//@desc fetches all tasks from todoDb
//@route  GET /api/task/
export const getTasks=( async(req:Request,res:Response,next:NextFunction)=>
{
  try
  {
    const per_page = parseInt(req.query.per_page as string) || 10
    const page = parseInt(req.query.page as string) || 1
    const search_term = req.query.search_term  as string|| ""
    const completed = req.query.completed as string
    const offset= (page-1) * per_page 
    
    const {taskInfo,totalCount,totalPage}= await taskService.getTasks(per_page,offset,search_term, completed ) as any
   
    if(taskInfo.length>0)
    {
      return res.status(200).json({success:true,taskCount:totalCount,totalPage,tasks:taskInfo})
    }

    return res.status(400).json({success:false,message:"No data"})

  }

  catch (error)
  {
    next(error)
  }

})

//@desc CREATES new task into the db
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

//@desc UPDATES the tasks 
//@route PUT /api/task
export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try
  {
    const updatedData = await taskService.updateTask(req)

    if (updatedData.rowCount === 0) 
    {
      // No task was updated (possibly the task with the given ID doesn't exist)
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.status(200).json({ success: true, message: 'Task updated', updatedTask:updatedData.updatedTask});
  } 
  catch (err)
  {
    next(err)   
  }
};

//@desc DELETES the tasks 
//@route DELETE /api/task
export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try 
  {
    const deletedRowCount = await taskService.deleteTask(req)
    if (deletedRowCount != 0) 
    {
        return res.status(204).json({success:true});
    }
    else 
    {
        return res.status(404).json({ success: false, message: 'No task found' });
    }
  } 
  catch (error)
  {
    next(error); 
  }
};

