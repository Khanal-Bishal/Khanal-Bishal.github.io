import Joi from 'joi';

const profileSchema = Joi.object(
    {
        name: Joi.string().required().messages(
            {
                'string.base': 'name must be a string',
                'any.required': 'name is required'
            }
        ),
        aboutme: Joi.string().required().messages(
            {
                'string.base': 'aboutme must be a string',
                'any.required': 'aboutme is required'
            }
        ),
        email: Joi.string().email().required().
            messages
            (
                {
                    'string.base': 'Email must be a string',
                    'any.required': 'Email is required',
                    'string.email': 'Must be a email'
                }
            ),
        contact: Joi.string().required().messages(
            {
                'string.base': 'contact must be a string',
                'any.required': 'contact is required'
            }
        ),
        education: Joi.string().required().messages(
            {
                'string.base': 'education must be a string',
                'any.required': 'education is required'
            }
        ),
    }
)

export default profileSchema
