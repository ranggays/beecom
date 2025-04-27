// sync.js
import sequelize from './db.js';
import User from './models/userEcom.model.js';
import dotenv from 'dotenv';
dotenv.config();

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("Database synced successfully.");

        // Update old users without role
        const [updatedCount] = await User.update(
            { role: 'user' },
            { where: { role: null } }
        );
        console.log(`Updated ${updatedCount} users with missing role.`);
    } catch (error) {
        console.error("Failed to sync database:", error);
    }
};

syncDatabase();
