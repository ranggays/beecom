import express from "express";
import passport from "passport";
import "../ecom/local.js";
import "../ecom//google.js";
import User from "../models/userEcom.model.js";
import { hashPass } from "../middleware/hash.js";

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log("Mencoba registrasi dengan data:", req.body);
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
        console.error("!!! ERROR SAAT REGISTRASI:", error);

        // 4. Kirim respons error yang lebih informatif (opsional tapi bagus)
        if (error.name === 'SequelizeUniqueConstraintError') {
        // Jika email sudah ada
        return res.status(409).json({ message: 'Email already exists.' });
        }
        
        // Untuk semua error lain, kirim 500
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) =>{
    res.status(200).json({ msg : 'Login Success', user: req.user });
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
}));

router.get('/google/redirect', passport.authenticate('google', {
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