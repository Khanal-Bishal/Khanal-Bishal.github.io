import { Sequelize} from 'sequelize-typescript';
import 'reflect-metadata'
const colors=require('colors')

//connecting to db 
export const sequelize = new Sequelize('postgres://postgres:postgresdb@localhost:5432/Todo', {
  dialect: 'postgres',
  logging:false
  
});


//testing the connection 
const connectDb=async()=>
{
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: false });  //synchronize model with db ,without forcing drop of tables 
      console.log(colors.rainbow('Connection has been established successfully.'));
    } catch (error) {
      console.error(colors.red('Unable to connect to the database:', error));
    }
}
export default connectDb