import 'express-async-errors';
import express from 'express';
import handleError from './middlewares/handleError';
import productRouter from './routes/products.route';
import userRouter from './routes/users.route';
import orderRouter from './routes/order.route';
import loginRouter from './routes/login.route';

const app = express();

app.use(express.json());

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

app.use(handleError);

export default app;
