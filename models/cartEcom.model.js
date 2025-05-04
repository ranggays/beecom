import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import User from "./userEcom.model.js";
import Product from "./productEcom.model.js";

const Cart = sequelize.define('cart', {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Relasi User ↔️ Cart
Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Cart, { foreignKey: 'userId' });

// Relasi Product ↔️ Cart
Cart.belongsTo(Product, { foreignKey: 'productId' });
Product.hasMany(Cart, { foreignKey: 'productId' });

export default Cart;
