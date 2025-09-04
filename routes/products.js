import express from "express";
import {Product} from "../models/product.model.js"
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', addProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;