import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
const colors = require('colors')
import fileUpload from 'express-fileupload' 

import connectDb from './config/database'
connectDb()

const app = express()
dotenv.config()

import authRoute from './routes/auth'
import blogRoute from './routes/blog'
import profileRoute from './routes/profile'
import commentRoute from './routes/comment'

import pageNotFound from './middlewares/pageNotFound'
import customErrorHandler from './middlewares/customErrorHandler'

import {PORT} from './constants/port'
import {accessLogStream} from './utils/logger'

//application level middlewares
app.use(express.json())
app.use(fileUpload())
app.use(express.static('uploads'))
app.use(morgan(`:method :url  :status :response-time ms :date[web]`,{ stream: accessLogStream })) //logger for HTTP requests

//router level middleware
app.use('/api/user', authRoute)
app.use('/api/blog', blogRoute)
app.use('/api/aboutme', profileRoute)
app.use('/api/comment', commentRoute)

app.use(pageNotFound)
app.use(customErrorHandler)


//connecting to server 
app.listen(PORT,()=>
{
    console.log(colors.white(`Listening from port number ${ PORT }`))
})


