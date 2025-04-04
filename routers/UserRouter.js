import { Router } from 'express';
import {signup, login, logout} from '../controllers/UserController.js';

// const authMiddleware = require('../middleware/authMiddleware.cjs');

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
// userRouter.get('/tokenCheck', authMiddleware, UserController.tokenCheck)

export default userRouter