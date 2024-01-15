import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import { ADMIN, USER } from '../constants/role'

/**
 * @description User schema 
 */
const User = sequelize.define
    (
        'User',
        {
            user_id:
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name:
            {
                type: DataTypes.STRING,
                allowNull: false
            },
            email:
            {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate:
                {
                    isEmail: true
                }
            },
            password:
            {
                type: DataTypes.STRING,
                allowNull: false,

            },
            role:
            {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: USER,
                validate:
                {
                    isIn: [[ADMIN, USER]]
                }
            }
        },
        {
            timestamps: true
        })

export default User

