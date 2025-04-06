import { Router } from 'express';
import {signup, login, logout, tokenCheck, getUser, roleCheck, getAllUsers} from '../controllers/UserController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/getAllUsers', getAllUsers)
userRouter.get('/tokenCheck', authMiddleware, tokenCheck)
userRouter.get('/:userId', authMiddleware, getUser)
userRouter.get('/role/:userId', authMiddleware, roleCheck)

export default userRouter