// db.js
// const { Sequelize } = require('sequelize');
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,     // contoh: 'mydb'
  process.env.DB_USER,     // contoh: 'postgres'
  process.env.DB_PASS, // contoh: 'yourpassword'
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
