import { Router } from 'express';
import { getProducts, getFavorites } from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/', getProducts)
productRouter.get('/favorites/:userId', getFavorites)

export default productRouter