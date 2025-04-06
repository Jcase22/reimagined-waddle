import { Router } from 'express';
import { getProducts, getFavorites, removeFavorite, getProductDetails, addFavorite, getProductsByBrand } from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/', getProducts)
productRouter.get('/details/:productId', getProductDetails)
productRouter.get('/brand/:brand', getProductsByBrand)
productRouter.get('/favorites/:userId', authMiddleware, getFavorites)
productRouter.patch('/favorites/:userId/:productId', authMiddleware, removeFavorite)
productRouter.patch('/add-favorites/:userId/:productId', authMiddleware, addFavorite)

export default productRouter