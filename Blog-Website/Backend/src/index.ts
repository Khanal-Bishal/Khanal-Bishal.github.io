import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
const colors = require('colors')

import connectDb from './config/database'

const app = express()
dotenv.config()
connectDb()

import authRoute from './routes/auth'
import blogRoute from './routes/blog'
import pageNotFound from './middlewares/pageNotFound'
import customErrorHandler from './middlewares/customErrorHandler'

import {PORT} from './constants/port'
import {accessLogStream} from './utils/logger'

//application level middlewares
app.use(express.json())
app.use(morgan(`:method :url  :status :response-time ms :date[web]`,{ stream: accessLogStream })) // logger for HTTP requests

//router level middleware
app.use('/api/user',authRoute)
app.use('/api/blog',blogRoute)

app.use(pageNotFound)
app.use(customErrorHandler)


//connecting to server 
app.listen(PORT,()=>
{
    console.log(colors.white(`Listening from port number ${PORT}`))
})


