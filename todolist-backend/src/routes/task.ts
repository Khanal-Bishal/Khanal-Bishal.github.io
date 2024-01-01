import express from 'express'

import { getTasks,createTask,updateTask,deleteTask} from '../controllers/task'
import TaskSchema from '../models/taskSchema'
import validateSchema from '../middlewares/validateSchema'
import checkAuthentication from '../middlewares/checkAuthentication'



const router= express.Router()



//@route /api/task
router.get('/',checkAuthentication,getTasks)
router.post('/',checkAuthentication,validateSchema(TaskSchema),createTask)
router.put('/:id',checkAuthentication,updateTask)
router.delete('/:id',checkAuthentication,deleteTask)



export default router