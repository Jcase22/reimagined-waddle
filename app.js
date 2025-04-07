import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import userRouter from './routers/UserRouter.js';
import productRouter from './routers/ProductRouter.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.get('/admin', adminPermissionCheck,(req, res) => {
//   res.send("TESTING");
// })

app.use(express.static(path.join(__dirname, 'views')));

app.get('/product/details/:productId', async (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'product/index.html'));
})

app.use('/user', userRouter)
app.use('/products', productRouter)

app.all('*', (_req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

export default app