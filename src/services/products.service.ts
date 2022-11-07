import ProductModel from '../models/products.model';
import IProduct from '../interfaces/product.interface';
import HttpError from '../utils/httpError';
import productSchema from './schemas/product.schema';

export default class ProductsService {
  productModel = new ProductModel();

  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.productModel.getAllProducts();
    if (!products) throw new HttpError(500, 'Internal Error');
    return products;
  }

  async insertProduct(data: IProduct) {
    const { error } = productSchema.validate(data);
    if (error) {
      const code = error.message.includes('is required') ? 400 : 422;
      throw new HttpError(code, error.message);
    }
    
    const { insertId, affectedRows } = await this.productModel.insertProduct(data);
    if (affectedRows === 0) throw new HttpError(500, 'Internal Error');
    return { id: insertId, ...data };
  }
}
