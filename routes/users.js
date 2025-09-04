import express from "express";
import { User } from "../models/user.model.js";
import { hashPass } from "../middleware/hash.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
    // res.status(200).json(mockUser);
    const findUser = await User.find();
    if(!findUser){
        const error = new Error('cant get the users');
        error.status = 404;
        return next(error);
    }
    res.status(200).json(findUser);
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const findUser = await User.findById(id);
    // const findUser = mockUser.find((user) => user.id === id);
    if(!findUser){
        const error = new Error(`user with id ${id} not found`);
        error.status = 404;
        return next(error);
    }else{
        res.status(200).json(findUser);
    }
});

router.post('/', async (req, res, next) => {
    const { body : itemUser } = req;
    // const pass = itemUser.password;
    // const hash = await User.hashPassword(pass);
    itemUser.password = hashPass(itemUser.password);
    const addUser = await User.create(itemUser);
    if(!addUser){
        res.status(500).json({msg : "user not created"});
    }else {
        res.status(200).json(addUser);
    }
});

router.put('/:id', async (req, res, next) => {
    const { params: id } = req;
    const { body : itemUser } = req;
    const updateUser = await User.findByIdAndUpdate(id, itemUser);
    if(!updateUser){
        res.status(400).json({msg : "user not updated"});
    } else {
        const findUser = await User.findById(id);
        console.log(findUser);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { params: id } = req;
    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser){
        res.status(400).json({msg : "user not deleted"});
    } else {
        res.status(200).json(deleteUser);
    }
});

export default router;
