import { DataTypes } from "sequelize";
import {sequelize} from '../config/database'

const User= sequelize.define(
    'User',
    {
        id:
        {
            type:DataTypes.INTEGER.UNSIGNED,
            autoIncrement:true,
            primaryKey:true,
        },
        name:
        {
            type:DataTypes.STRING,
            allowNull:false,

        },
        email:
        {
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,

        },
        password:
        {
            type:DataTypes.STRING,
            allowNull:false
        }
    },
    
    {
        timestamps:true
    }
)

export default User

