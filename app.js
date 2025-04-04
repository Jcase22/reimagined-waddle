import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import userRouter from './routers/UserRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/user', userRouter)

app.all('*', (_req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

export default app