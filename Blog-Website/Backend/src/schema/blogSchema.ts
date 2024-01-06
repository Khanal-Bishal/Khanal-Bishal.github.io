import Joi from "joi";

const blogSchema = Joi.object(
    {
        title : Joi.string().required().messages(
            {
                'string.base':  'title must be a string',
                'any.required' : "title is required"
            }
        ),
        description : Joi.string().required().messages(
            {
                'string.base' : 'description must be a string',
                'any.required' : 'description is required'
            }
        )
    }
)

export default blogSchema