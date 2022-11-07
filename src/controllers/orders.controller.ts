import { Request, Response } from 'express';
import OrderService from '../services/orders.service';
import HttpError from '../utils/httpError';
import { decodeToken } from '../utils/jwt';

export default class OrederController {
  orderService = new OrderService();

  async getAllOrders(_req: Request, res: Response) {
    const orders = await this.orderService.getAllOrders();
    res.status(200).json(orders);
  }

  async insertOrder(req: Request, res: Response) {
    const { productsIds } = req.body;
    
    const token = req.get('Authorization') as string;
    if (!token) throw new HttpError(401, 'Token not found');
    
    const { id } = decodeToken(token);

    await this.orderService.insertOrder(id, productsIds);

    res.status(201).json({ userId: id, productsIds });
  }
}
