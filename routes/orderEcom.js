import express from 'express';
import Order from '../models/order.model.js';
import OrderItem from '../models/orderItem.model.js';
import Cart from '../models/cartEcom.model.js';
import Product from '../models/productEcom.model.js';

const router = express.Router();

router.post('/order', async (req, res) => {
    try {
        console.log('order')
        const userId = req.user.id;
        //item isinya ada tentang customer hingga status
        const {body : item} = req;
        const cartItems = await Cart.findAll(
            {
                where : {userId},
                include: [Product]
            }
        );
        const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);
        const newOrder = await Order.create({
            ...item,
            total,
            userId
        });
    
        const orderItemsData = cartItems.map(item => ({
            orderId : newOrder.id,
            productId : item.productId,
            quantity : item.quantity,
            price : item.product.price
        }));
    
        await OrderItem.bulkCreate(orderItemsData);
    
        await Cart.destroy(
            {
                where : {userId},
            }
        )
    
        res.status(201).json({msg : 'Co berhasil', order: newOrder});        
    } catch (error) {
        res.status(401).json({msg : error.message});
    }
});

router.get('/order', async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
            {
                model: OrderItem,
                include: [Product]
            },
            "user"
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({msg: error.message});
    } 
});

router.get('/order/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Product
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(orders);
    } catch (error) {
        console.error(error); // tambahan log
        res.status(400).json({ msg: error.message });
    }
});

router.put('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log('status : ',req.body.status);
        const updateOrder = await Order.findByPk(id);
        if(updateOrder){
            updateOrder.status = status;
            await updateOrder.save();
            res.status(200).json(updateOrder);
        }
    } catch (error) {
        res.status(400).json({msg : error.message});
    }
});

router.delete('/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOrder = await Order.findByPk(id);
        if(deleteOrder){
            await deleteOrder.destroy();
            res.status(200).json(deleteOrder);
        }
    } catch (error) {
        res.status(400).json({msg : error.message});
    }
});

export default router;