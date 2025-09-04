import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import User from "./userEcom.model.js";

const Order = sequelize.define('order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    customerName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    customerNumber : {
        type : DataTypes.STRING,
        allowNull : false
    },
    customerAddress : {
        type : DataTypes.STRING,
        allowNull : false
    },
    status : {
        type: DataTypes.STRING,
        defaultValue: 'dikemas'
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Order.belongsTo(User, { foreignKey: 'userId'});
User.hasMany(Order, { foreignKey: 'userId'});

export default Order;