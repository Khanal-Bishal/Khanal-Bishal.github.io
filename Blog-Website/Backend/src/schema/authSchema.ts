import Joi from "joi";

export const signUpSchema = Joi.object(
    {
       name: Joi.string().alphanum().min(4).max(255)
    .required()
    .messages({
      'string.base': 'Username should be a string',
      'string.alphanum': 'Username should only contain alphanumeric characters',
      'string.min': 'Username should have at least 4 characters',
      'string.max': 'Username should not exceed 255 characters',
      'any.required': 'Username is required',
    }),

    email: Joi.string().email().required().
    messages
    (
        {
            'string.base': 'Email must be a string',
            'any.required': 'Email is required',
            'string.email': 'Must be a email'
        }
    ),

    password:Joi.string().max(255).min(4).required().
    messages(
        {
            'string.base' : 'Password must be string',
            'string.min' : 'password should have at least 4 character',
            'string.max' : 'password should not exceed 255 character',
            'any.required': 'password is required'
        }
    ),

    },

)

export const loginSchema = Joi.object(
    {

        email: Joi.string().email().required().
        messages
        (
            {
                'string.base': 'Email must be a string',
                'any.required': 'Email is required',
                'string.email': 'Must be a email'
            }
        ),

        password:Joi.string().max(255).min(4).required().
        messages
        (
            {
                'string.base' : 'Password must be string',
                'string.min' : 'password should have at least 4 character',
                'string.max' : 'password should not exceed 255 character',
                'any.required': 'password is required'
            }
        )
    }
)