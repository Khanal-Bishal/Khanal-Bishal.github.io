import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database'
import Blog from './blog'
import User from './user'

const Comment = sequelize.define(
    'Comment',
    {
        comment_id:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: true
    }
)

// BLOG-COMMENT association 
Blog.hasMany(Comment, { foreignKey: 'blog_id' })
Comment.belongsTo(Blog, { foreignKey: 'blog_id' })

//USER-COMMENT association
User.hasMany(Comment, { foreignKey: 'user_id' })
Comment.belongsTo(User, { foreignKey: 'user_id' })

//Establish many-many relationship between blog and user for reviews
Blog.belongsToMany(User, { through: 'BlogUserReview', foreignKey: 'blog_id' })
User.belongsToMany(Blog, { through: 'BlogUserReview', foreignKey: 'user_id' })

export default Comment 