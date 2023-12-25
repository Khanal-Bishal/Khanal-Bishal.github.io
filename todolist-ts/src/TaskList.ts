import { Task } from "./Task";

export interface ITaskList
{
    list: Task[]
    getTaskById : (id:string)=>Task | null
    getTaskByIndex :(index:number)=>Task | null
    addTask : (task:Task)=>void

}

export class TaskList implements ITaskList 
{
    list:Task[]
    
    constructor(tasks?:Task[] )
    {
        this.list= tasks || []
    }

    getTaskById(id:string) 
    {
        return this.list.find(item=>
            {
                return item.id===id 
            }) || null 
    }

    addTask(task:Task)
    {
        this.list.push(task)
    }

    getTaskByIndex (index: number) 
    {
        return this.list[index]||null
    }



}