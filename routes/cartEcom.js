import express from 'express'
import Cart from '../models/cartEcom.model.js'
import Product from '../models/productEcom.model.js';

const router = express.Router();

router.get('/cart', async (req,res) => {
    try {
        console.log('req : ',req);
        const userId = req.user.id;
        console.log('get cart');
        const cart = await Cart.findAll({
            where: { userId},
            include: [Product]
        });
        if(cart){
            res.status(200).json(cart);
        }else{
            throw new Error('Cant get Cart');
        }
    } catch (error) {
        res.status(400).json({msg : error.message});
    };
});

router.post('/cart', async (req, res) => {
    try {        
        const { body : item} = req;
        //dalam item ada quantity dan productId
        // const productId = item.productId;
        const userId = req.user.id;
        const cart = await Cart.create({
            ...item,
            userId
        });
        if(cart){
            res.status(201).json(cart);
        }else{
            throw new Error('Cant create cart');   
        };
    } catch (error) {
        res.status(401).json({msg : error.message || 'Something went wrong' });  
    }
});

router.put('/cart/:id', async (req, res) => {
    try {        
        //isi item nanti ada quantity saja
        const { quantity} = req.body;
        const { id } = req.params;
        console.log("Updating cart ID:", id, "to quantity:", quantity);
        const updateCart = await Cart.findByPk(id);
        if(!updateCart){
            throw new Error('cant update cart');    
        }else{
            updateCart.quantity = quantity;
            await updateCart.save();
            res.status(201).json(updateCart);
        };
    } catch (error) {
        res.status(401).json({msg : error});
    }
});

router.delete('/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.findByPk(id);
        if(!cart){
            throw new Error('cant get cart for delete');
        }else{
            await cart.destroy();
            res.status(201).json(cart);
        }
    } catch (error) {
        res.status(401).json({msg : error});
    }
});

export default router;

