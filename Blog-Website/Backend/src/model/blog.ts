import {  DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Blog = sequelize.define('Blog',
    {
        blog_id:
        {
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },

        title:
        {
            type:DataTypes.STRING,
            allowNull:false,

        },

        description:
        {
            type:DataTypes.STRING,
            allowNull:false
        },

        image:
        {
            type:DataTypes.STRING,
            allowNull:true
        } 

    },

    {
        timestamps:true
    }

) 

export default Blog