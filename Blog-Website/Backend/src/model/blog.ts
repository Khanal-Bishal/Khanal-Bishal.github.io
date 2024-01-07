import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./user";

const Blog = sequelize.define('Blog', {
    blog_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

// User-BLOG association 
User.hasMany(Blog, { foreignKey: 'admin_id' });
Blog.belongsTo(User, { foreignKey: 'admin_id' });

export default Blog;
