import Joi from "joi";

const commentSchema = Joi.object(
    {
        comment : Joi.string().required().messages(
            {
                'string.base':  'comment must be a string',
                'any.required' : "comment is required"
            }
        ),        
    }
)
export default commentSchema