import {DataTypes} from 'sequelize';
import  sequelize  from '../db.js';

const User = sequelize.define('user', {
    fullName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    googleId:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    provider:{
        type: DataTypes.STRING,
        defaultValue: 'local',
    }
},{
    timestamps: true
})

export default User;