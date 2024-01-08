import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
const colors = require('colors')
import fileUpload from 'express-fileupload' 

import connectDb from './config/database'

connectDb()
dotenv.config()

import authRoute from './routes/auth'
import blogRoute from './routes/blog'
import profileRoute from './routes/profile'
import commentRoute from './routes/comment'
import imageRoute from './routes/image'

import pageNotFound from './middlewares/pageNotFound'
import customErrorHandler from './middlewares/customErrorHandler'

import {PORT} from './constants/port'
import {accessLogStream} from './utils/logger'

const app = express()

//application level middlewares
app.use(express.json())
app.use(fileUpload())
app.use(express.static('uploads'))
app.use(morgan(`:method :url  :status :response-time ms :date[web]`,{ stream: accessLogStream })) //logger for HTTP requests

//route level middleware
app.use('/api/user', authRoute)
app.use('/api/blog', blogRoute)
app.use('/api/aboutme', profileRoute)
app.use('/api/comment', commentRoute)
app.use('/api/image', imageRoute)

app.use(pageNotFound)
app.use(customErrorHandler)

//connecting to server 
app.listen(PORT,()=>
{
    console.log(colors.white(`Listening from port number ${ PORT }`))
})


