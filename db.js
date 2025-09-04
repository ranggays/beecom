// db.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Cek apakah DATABASE_URL sudah di-set di environment variables
if (!process.env.DATABASE_URL) {
  throw new Error("FATAL ERROR: DATABASE_URL is not defined.");
}

// Gunakan satu connection URL dari Railway
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Diperlukan untuk koneksi ke banyak database cloud
    }
  },
  logging: false,
});

export default sequelize;