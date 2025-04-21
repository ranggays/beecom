import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_URL,
    dialect: 'mysql',
    port: process.env.DB_PORT,
})

export default sequelize;