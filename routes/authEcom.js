import express from "express";
import passportLocal from "../ecom/local.js";
import passportGoogle from "../ecom//google.js";
import User from "../models/userEcom.model.js";
import { hashPass } from "../middleware/hash.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {        
        const { body: itemUser } = req;
        itemUser.password = hashPass(itemUser.password);
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

router.post('/login', passportLocal.authenticate('local'), (req, res) =>{
    res.status(200).json({ msg : 'Login Success', user: req.user });
});

router.get('/google', passportGoogle.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
}));

router.get('/google/redirect', passportGoogle.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:5173/',
}), (req, res) => {
    res.status(200).json({ msg: 'Login Success', user: req.user });
});

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

export default router;