import express from 'express';
import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';
// import passports from './middleware/google-passport.js';
import authEcom from './routes/authEcom.js';
import productEcom from './routes/productEcom.js';
import cartEcom from './routes/cartEcom.js'
import orderEcom from './routes/orderEcom.js'
import posts from './routes/posts.js';
import products from './routes/products.js'
import users from './routes/users.js';
import { logger } from './middleware/logger.js';
import { error } from './middleware/error.js';
import path from 'path';
import url from 'url';
// import mongoose from 'mongoose';
// import MongoStore from "connect-mongo";
import cors from 'cors';
import sequelize from './db.js';
import dotenv from 'dotenv';
dotenv.config();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const port = process.env.PORT || 3000;

const app = express();

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
//use session mongodb ( commented out because using mysql session)
app.use(session({
    secret: 'ray the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 70000
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:KiIwnLqAiwM2W4S4@backenddb1.s2fj6k0.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB1',
    })
}));
*/

//use session mysql
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 70000
    }
}))

//use passport
app.use(passport.initialize());
app.use(passport.session());



//use logger
app.use(logger);

//use routes posts
// app.use('/api/posts', posts);

//use routes products
// app.use('/api/products', products);

app.use('/auth', authEcom);

app.use('/api', productEcom);

app.use('/api', cartEcom);

app.use('/api', orderEcom);

//untuk ec2 saya tambahkan '0.0.0.0' jika di local error hapus
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(port, '0.0.0.0', () => {
        console.log(`server is running on ${port}`)
    })
})



/* gunakan session
app.post('/api/auth', (req,res) => {
    // const { body: {username, password} } = request;
    const username = req.body.username;
    const password = req.body.password;
    const findUser = mockUser.find((user) => user.username === username)
    if(!findUser || findUser.password !== password){
        res.status(401).json({msg : "BAD CREDENTIALS"})
    }else{
        req.session.user = findUser;
        return res.status(200).json(findUser);
    }
})

app.get('/api/auth/status', (req, res) => {
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log(sessionData);
        }
    })
    return req.session.user ? res.status(200).json(req.session.user) : res.status(401).json({msg:"Not Authenticated"});
})

app.post('/api/cart', (req,res) => {
    if(!req.session.user){
        res.status(401).json({msg : "session expired"});
    }else{
        const { body : item} = req;
        const cart = req.session.cart;
        if(!cart){
            req.session.cart = [item];
        }else{
            cart.push(item);
        }
        return res.status(201).json(item);
    }
})

app.get('/api/cart', (req,res) => {
    if(!req.session.user){
        return res.status(401).json({msg : "session expired"});
    }else{
        return res.json(req.session.cart || []);
    }
})
*/

//use passport
// app.use('/api/auth', auth);

/*

//use users biasa
app.use('/api/users', users);
*/

/*
//use oauth2.0
app.get('/api/auth/google', passports.authenticate('google', {
    scope: ["profile"],
    prompt: "select_account"
}));

app.get('/api/auth/google/redirect', passports.authenticate("google", {failureRedirect: "/login-failed"}), (req, res) => {
    console.log('SESSION AFTER AUTH:', req.session);
    console.log('USER AFTER AUTH',req.user);
    console.log('SESSION ID',req.sessionID);
    res.status(200).json(req.user);
    // res.redirect('/api/auth/status');
});

app.get('/api/auth/logout', (req, res, next) => {
    if(!req.isAuthenticated()){
        console.log('logout nonauthenticated user');
        return res.status(401).json({msg : "Not Authenticated"});
    }else{
        console.log('logout authenticated user');
        req.logout((err) => {
            if(err){
                console.log(err);
                return next(err);
            }else{
                req.session.destroy((err) => {
                    if(err){
                        console.log(err);
                        return next(err);
                    }else{
                        res.clearCookie('connect.sid', {path: '/'});
                        res.status(200).json({msg : "logout success"});
                    }
                })
            }
        })
    }
})

app.get('/api/auth/status', (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).json(req.user);
    }else{
        res.status(401).json({msg : "Not Authenticated"});
        console.log('Not Authenticated');
    }
    /*
    console.log(req.session);
    console.log(req.session.id);
    console.log(req.user);
    return req.user ? res.status(200).json(req.user) : res.status(401).json({msg:"Not Authenticated"});
    
})
*/

//use error handler
app.use((req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
})
app.use(error);

/*
//connect mongodb
mongoose.connect("mongodb+srv://admin:KiIwnLqAiwM2W4S4@backenddb1.s2fj6k0.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB1").then(() => {
    console.log('database connected');
    app.listen(port, () => {
        console.log(`server is running on ${port}`)
    })
}).catch((error) => {
    console.log('database not connected');
    console.log(error.message);
})
*/

