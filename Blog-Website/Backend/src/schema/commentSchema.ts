import Joi from "joi"

const commentSchema = Joi.object(
    {
        comment: Joi.string().required().messages(
            {
                'string.base': 'comment must be a string',
                'any.required': "comment is required"
            }
        ),
        rating: Joi.number().required().messages(
            {
                'string.base': 'comment must be a number',
                'any.required': "rating is required"
            }
        ),
    }
)
export default commentSchema