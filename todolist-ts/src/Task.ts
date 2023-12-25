import { getRandomId } from "./utils"
import { ID_LENGTH } from "./constants"

export interface ITask {
    id: string
    todo: string
    completed: boolean
    description:string

    setTaskCompleted : ()=>void
    toogleTaskCompleted : ()=>void
    getTodo : ()=>string
    setTodo :(todo:string)=>void

}

export class Task implements ITask {
    id: string 
    todo :string
    completed: boolean
    description: string

    constructor( todo:string, completed: boolean, description:string="")
    {
        this.id=getRandomId(ID_LENGTH)
        this.todo=todo
        this.completed=completed
        this.description=description 
    }

    setTaskCompleted()
    {
        this.completed=true
    } 

    toogleTaskCompleted()
    {
        this.completed=!this.completed
    } 

    getTodo()
    {
        return this.todo
    }

    setTodo(todo: string)
    {
        this.todo=todo
    } 

    getTaskId ()
    {
        return this.id
    }


}