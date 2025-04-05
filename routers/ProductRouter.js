import { Router } from 'express';
import { getProducts, getFavorites, removeFavorite, getProductDetails, addFavorite } from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/', getProducts)
productRouter.get('/favorites/:userId', authMiddleware, getFavorites)
productRouter.patch('/favorites/:userId/:productId', authMiddleware, removeFavorite)
productRouter.get('/details/:productId', authMiddleware, getProductDetails)
productRouter.patch('/add-favorites/:userId/:productId', authMiddleware, addFavorite)

export default productRouter