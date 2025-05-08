import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import Order from "./order.model.js";
import Product from "./productEcom.model.js";

const OrderItem = sequelize.define('order_item', {
    orderId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price : {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

OrderItem.belongsTo(Order, { foreignKey: 'orderId'});
Order.hasMany(OrderItem, {foreignKey: 'orderId', onDelete: 'CASCADE'});

OrderItem.belongsTo(Product, { foreignKey: 'productId'});
Product.hasMany(OrderItem, {foreignKey: 'productId'});

export default OrderItem;