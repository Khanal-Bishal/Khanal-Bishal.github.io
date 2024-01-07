import { Sequelize } from "sequelize";
import 'reflect-metadata'


const colors = require('colors')

//connecting to database
export const sequelize = new Sequelize('postgres://postgres:postgresdb@localhost:5432/Blog', {
  dialect: 'postgres',
  logging: false
  
});

//testing(authenticating) the connection 
const connectDb= async() =>
{
    try 
    {
        await sequelize.authenticate()
        await sequelize.sync( { force: false } )   //synchornizes model with db, without forcing to drop the table 
        console.log(colors.rainbow("Connected to Database"))
    }
    catch (error)
    {
        console.log(colors.red(`Unable to connect to db. Error: ${ error }`));
        
    }
}

export default connectDb;

