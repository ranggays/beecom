import sequelize from '../db.js';
import { DataTypes } from 'sequelize';
import Category from './categoryEcom.model.js';

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stars:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})

export default Product;

