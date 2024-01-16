import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database'

const Task = sequelize.define(
    "Task",
    {
        taskid:
        {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false,

        },
        description:
        {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        completed:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

    },

    {
        timestamps: true
    }
)

export default Task