import express from 'express';
import Product from '../models/productEcom.model.js';
import { upload } from '../middleware/multer.js';
// import { where } from 'sequelize';

const router = express.Router();

router.post('/products', upload.single('image'), async (req, res) => {
    const {body: item} = req;
    if(item.categoryId){
        item.categoryId = parseInt(item.categoryId);
    }
    item.image = `/images/${req.file.filename}`;
    try {
        const product = await Product.create(item);
        if(!product){
            throw new Error('Product not created');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({msg : error});
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        if(!products){
            throw new Error('Product not found');
        }else{
            res.status(200).json(products);
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({msg : error});
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if(!product){
            throw new Error('Product not found');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : error});
    }
});

router.put('/products/:id', upload.single('image'),async (req, res) => {
    const { id } = req.params;
    const {body: item} = req;
    item.image = req.file ? `/images/${req.file.filename}` : undefined;
    try {
        const product = await Product.update(item, {where :{id} });
        if(!product){
            throw new Error('Product not found');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : error});
    }
});

router.patch('/products/:id', async (req, res) => {
    const {id} = req.params;
    const {body: item} = req;
    try {
        const product = await Product.update(item, {where :{id} });
        if(!product){
            throw new Error('Product not found');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : error});
    }
});

router.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.destroy({where :{id} });
        if(!product){
            throw new Error('Product not found');
        }else{
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({msg : error});
    }
});

export default router;