import IOrder from '../interfaces/order.interface';
import OderModel from '../models/orders.model';
import HttpError from '../utils/httpError';
import orderSchema from './schemas/orders.schema';

export default class OrderService {
  orederModel = new OderModel();

  async getAllOrders(): Promise<IOrder[]> {
    const orders = await this.orederModel.getAllOrders();
    if (!orders) throw new HttpError(500, 'Internal Error');
    return orders;
  }

  async insertOrder(userId: number | undefined, productsIds: number[]) {
    const { error } = orderSchema.validate({ productsIds });    
    if (error) {
      const code = error.message.includes('is required') ? 400 : 422;
      throw new HttpError(code, error.message);
    }

    if (productsIds.length === 0) {
      throw new HttpError(422, '"productsIds" must include only numbers');
    }

    const { insertId } = await this.orederModel.insertUserIdOrder(userId);

    const result = await Promise.all(productsIds.map(async (id) => {
      await this.orederModel.insertOrder(insertId, id);
    }));

    return result;
  }
}
