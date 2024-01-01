import {Request} from 'express'
import Task from "../models/task"

export const getTasks=async()=>
{
    const doesTaskExist= await Task.findAll()
    let taskInfo
    if(doesTaskExist.length!=0)
    {
         taskInfo=doesTaskExist.map(task=>
            {
                return task.get({plain:true})
            })
            return taskInfo
            // return res.status(200).json({success:true,tasks:taskInfo})
    }
}

export const createTask = async(body:any)=>
{
      //@ts-ignore
        // const data={...req.body,createdBy:req.user.id}
        let data={...body}
        data=await Task.create(data)
        return data
}


export const updateTask= async(req:Request)=>
{
    const [rowCount, [updatedTask]] = await Task.update(req.body, { where: { taskid: req.params.id }, returning: true });
    return {rowCount,updatedTask}

}

export const deleteTask= async (req:Request)=>
{
    const deletedRowCount = await Task.destroy({ where: { taskid: req.params.id } });
    return deletedRowCount;
    
}