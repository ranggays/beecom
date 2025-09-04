// sync.js
import sequelize from './db.js';
import dotenv from 'dotenv';

// 1. Impor SEMUA model yang terlibat dalam relasi
import User from './models/userEcom.model.js';
import Product from './models/productEcom.model.js';
import Category from './models/categoryEcom.model.js';
// Impor juga Cart, CartItem, Order, dll. jika ada relasi lain

dotenv.config();

const syncDatabase = async () => {
    try {
        // 2. Definisikan SEMUA relasi di sini
        console.log("Defining associations...");
        Product.belongsTo(Category, { foreignKey: 'categoryId' });
        Category.hasMany(Product, { foreignKey: 'categoryId' });

        // Definisikan relasi lain di sini jika ada...
        // User.hasOne(Cart, ...);
        // Cart.hasMany(CartItem, ...);

        // 3. Jalankan sinkronisasi SETELAH semua relasi didefinisikan
        console.log("Syncing database with { alter: true }...");
        await sequelize.sync({ alter: true });
        
        console.log("Database synced successfully.");
        console.log('Database & tables updated!');

    } catch (error) {
        console.error("Failed to sync database:", error);
    } finally {
        // Tutup koneksi agar skrip bisa berhenti
        await sequelize.close();
    }
};

syncDatabase();