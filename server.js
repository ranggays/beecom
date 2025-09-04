import express from 'express';
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
import authEcom from './routes/authEcom.js';
import productEcom from './routes/productEcom.js';
import cartEcom from './routes/cartEcom.js'
import orderEcom from './routes/orderEcom.js'
import categoryEcom from './routes/categoryEcom.js'
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import path from 'path';
import url from 'url';
import cors from 'cors';
import sequelize from './db.js';
import dotenv from 'dotenv';
import Product from './models/productEcom.model.js';
import Category from './models/categoryEcom.model.js';
dotenv.config();
import './ecom/local.js'
// import passports from './middleware/google-passport.js';
// import posts from './routes/posts.js';
// import products from './routes/products.js'
// import users from './routes/users.js';
// import mongoose from 'mongoose';
// import MongoStore from "connect-mongo";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();

app.use(logger);

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

//use static folder
//for local
app.use(express.static(path.join(__dirname, 'public')));

//for ec2
//app.use(express.static(path.join(__dirname, '..', 'dist')));

app.use('/images' ,express.static(path.join(__dirname, 'public/images')));

//use middleware so that we can check / get api
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//use cookie parser
app.use(cookieParser());

/*

*/
app.set('trust proxy', 1);

//use session mysql
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

//use passport
app.use(passport.initialize());
app.use(passport.session());



//use logger

/*

*/
Product.belongsTo(Category, {
    foreignKey: 'categoryId'
});
Category.hasMany(Product, {
    foreignKey: 'categoryId'
});

app.use('/auth', authEcom);

app.use('/api', productEcom);

app.use('/api', cartEcom);

app.use('/api', orderEcom);

app.use('/api', categoryEcom);

//untuk ec2 saya tambahkan '0.0.0.0' jika di local error hapus
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(port, '0.0.0.0', () => {
        console.log(`server is running on ${port}`)
    })
});



/* gunakan session

/*

//use users biasa
app.use('/api/users', users);
*/

/*

*/

//use error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
});

app.use(error);

/*

*/

