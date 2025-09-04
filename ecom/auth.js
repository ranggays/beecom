import express from "express";
import passportLocal from "./local.js";
import passportGoogle from "./google.js";
import { User } from "../models/userEcom.model.js";
import { hashPassword } from "../middleware/hash.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {        
        const { body: itemUser } = req;
        itemUser.password = hashPassword(itemUser.password);
        const user = await User.create(itemUser);
        if(!user){
            throw new Error('User not created');
        }else{
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

router.post('/login', passportLocal.authenticate('local', (req, res) =>{
    res.status(200).json({ msg : 'Login Success', user: req.user });
}))

router.get('/google', passportGoogle.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/redirect', passportGoogle.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/me',
}));

router.get('/logout', (req, res) => {
    req.logout(() =>{
        res.status(200).json({ msg: 'Logout Success' });
    })
});

router.get('/me', (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).json(req.user);
    }else{
        res.status(401).json({ msg: 'Not Authenticated' });
    }
});