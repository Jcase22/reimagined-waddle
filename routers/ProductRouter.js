import { Router } from 'express';
import { getProducts } from '../controllers/ProductController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const productRouter = Router();

productRouter.get('/', getProducts)

export default productRouter