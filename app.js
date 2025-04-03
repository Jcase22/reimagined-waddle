import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.all('*', (_req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

export default app