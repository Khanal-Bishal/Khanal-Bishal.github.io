import Joi from "joi";

const blogSchema = Joi.object(
    {
        title: Joi.string().required().messages(
            {
                'string.base': 'Title must be a string',
                'any.required': "Title cannot be empty"
            }),
        description: Joi.string().required().messages(
            {
                'string.base': 'Description must be a string',
                'any.required': 'Description cannot be empty'
            }),
    })

export default blogSchema