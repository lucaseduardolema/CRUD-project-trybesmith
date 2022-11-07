import { Router } from 'express';
import OrederController from '../controllers/orders.controller';

const orderRouter = Router();

const orderController = new OrederController();

orderRouter
  .route('/')
  .get((req, res) => orderController.getAllOrders(req, res))
  .post((req, res) => orderController.insertOrder(req, res));

export default orderRouter;
