import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import userRouter from './routers/UserRouter.js';
import productRouter from './routers/ProductRouter.js';

const app = express();


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('views'));

app.use('/user', userRouter)
app.use('/products', productRouter)

app.all('*', (_req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

export default app