import express from 'express';
import Category from '../models/categoryEcom.model.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (!categories){
            throw new Error('Categories not found');
        }
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(400).json({msg : error});
    }
});

router.post('/categories', async (req, res) => {
    const {body: name} = req;
    try {
        const category = await Category.create(name);
        if(!category){
            throw new Error('Category not created');
        }
        res.status(200).json(category);
    } catch (error){
        console.error(error);
        res.status(400).json({msg : error});
    }
});

export default router;