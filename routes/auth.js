import express from "express";
import passport from "passport";
import '../middleware/local-passport.js';

const router = express.Router();

router.post('/', passport.authenticate('local') ,(req, res) => {
    res.status(200).json(req.user);
});

router.get('/status', (req, res) => {
    console.log(req.session);
    console.log(req.user);
    return req.user ? res.status(200).json(req.user) : res.status(401).json({msg:"Not Authenticated"});
})

export default router;