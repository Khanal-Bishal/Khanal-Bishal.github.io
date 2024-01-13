import {  DataTypes } from "sequelize";
import { sequelize } from "../config/database";


/**
 * @description  admin-profile schema 
 */
const Profile = sequelize.define 
(
    'Profile',
    {
        profile_id:
        {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name:
        {
            type:DataTypes.STRING,
            allowNull: false
        },
        email:
        {
            type: DataTypes.STRING,
            allowNull: false,
            validate:
            {
                isEmail: true
            }
        },
        image: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: 
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        education:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        aboutme:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    
    {
        timestamps:true
    }
)

export default Profile

