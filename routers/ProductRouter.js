import { Router } from 'express';
import { getProducts, getFavorites, removeFavorite } from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/', getProducts)
productRouter.get('/favorites/:userId', authMiddleware, getFavorites)
productRouter.patch('/favorites/:userId/:productId', removeFavorite)

export default productRouter