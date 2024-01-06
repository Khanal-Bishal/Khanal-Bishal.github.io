import express from 'express';
import dotenv from 'dotenv';
const colors =require('colors')
import morgan from 'morgan';


import connectDb from './config/database';

import auth_route from './routes/auth'
import task_route from './routes/task'

import pathNotFound from './middlewares/pathNotFound';
import customErrorHandler from './middlewares/customErrorHandler';

import { accessLogStream } from './utils/logger';

const app = express();
dotenv.config();

connectDb()

//global middlewares
app.use(express.json())  // parses the request body 

app.use(morgan(`:method :url  :status :response-time ms :date[web]`,{ stream: accessLogStream })) //logger for HTTP requests 

//routes level middlewares
app.use('/api/user',auth_route)
app.use('/api/task',task_route)

app.use(pathNotFound)
app.use(customErrorHandler)


//listening to server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(colors.yellow(`Listening from port ${PORT}`));
});




