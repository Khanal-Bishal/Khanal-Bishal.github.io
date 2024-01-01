import Joi from "joi";

const TaskSchema= Joi.object(
    {
        name:Joi.string().required(),
        completed:Joi.boolean(),
        description:Joi.string(),
        
    }
)

export default TaskSchema