import express from 'express';
import Product from '../models/productEcom.model.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { name, price, stars, ratingCount, categoryId } = req.body;
        
        // Validasi field wajib
        if (!name || name.trim() === '') {
            return res.status(400).json({ msg: 'Nama produk harus diisi' });
        }
        
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            return res.status(400).json({ msg: 'Harga produk harus valid dan lebih dari 0' });
        }
        
        if (!categoryId || categoryId === '' || isNaN(parseInt(categoryId))) {
            return res.status(400).json({ msg: 'Kategori produk harus dipilih' });
        }
        
        if (!req.file) {
            return res.status(400).json({ msg: 'Gambar produk harus diupload' });
        }

        // Prepare data dengan konversi tipe yang benar
        const productData = {
            name: name.trim(),
            price: parseFloat(price),
            stars: parseFloat(stars) || 0,
            ratingCount: parseInt(ratingCount) || 0,
            categoryId: parseInt(categoryId),
            image: `/images/${req.file.filename}`
        };

        console.log('Product data to create:', productData); // Debug log
        
        const product = await Product.create(productData);
        res.status(201).json(product);
        
    } catch (error) {
        console.error('Create product error:', error);
        res.status(400).json({ msg: error.message || 'Gagal membuat produk' });
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(400).json({ msg: error.message });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Get product by id error:', error);
        res.status(400).json({ msg: error.message });
    }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    try {
        const { name, price, stars, ratingCount, categoryId } = req.body;
        
        // Validasi field wajib untuk update
        if (!name || name.trim() === '') {
            return res.status(400).json({ msg: 'Nama produk harus diisi' });
        }
        
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            return res.status(400).json({ msg: 'Harga produk harus valid dan lebih dari 0' });
        }
        
        if (!categoryId || categoryId === '' || isNaN(parseInt(categoryId))) {
            return res.status(400).json({ msg: 'Kategori produk harus dipilih' });
        }

        // Prepare update data
        const updateData = {
            name: name.trim(),
            price: parseFloat(price),
            stars: parseFloat(stars) || 0,
            ratingCount: parseInt(ratingCount) || 0,
            categoryId: parseInt(categoryId)
        };

        // Hanya update image jika ada file baru
        if (req.file) {
            updateData.image = `/images/${req.file.filename}`;
        }

        console.log('Product data to update:', updateData); // Debug log
        
        const [updatedRowsCount] = await Product.update(updateData, { where: { id } });
        
        if (updatedRowsCount === 0) {
            return res.status(404).json({ msg: 'Product not found or no changes made' });
        }
        
        // Return updated product
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.error('Update product error:', error);
        res.status(400).json({ msg: error.message });
    }
});

router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { body: item } = req;
    
    try {
        // Konversi tipe data jika ada
        if (item.categoryId) {
            item.categoryId = parseInt(item.categoryId);
        }
        if (item.price) {
            item.price = parseFloat(item.price);
        }
        if (item.stars) {
            item.stars = parseFloat(item.stars);
        }
        if (item.ratingCount) {
            item.ratingCount = parseInt(item.ratingCount);
        }
        
        const [updatedRowsCount] = await Product.update(item, { where: { id } });
        
        if (updatedRowsCount === 0) {
            return res.status(404).json({ msg: 'Product not found or no changes made' });
        }
        
        const updatedProduct = await Product.findByPk(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        console.error('Patch product error:', error);
        res.status(400).json({ msg: error.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRowsCount = await Product.destroy({ where: { id } });
        
        if (deletedRowsCount === 0) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        
        res.status(200).json({ msg: 'Product deleted successfully' });
        
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(400).json({ msg: error.message });
    }
});

export default router;