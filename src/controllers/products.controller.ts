import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

export default class ProductController {
  productService = new ProductsService();

  async getAllProducts(_req: Request, res: Response) {
    const products = await this.productService.getAllProducts();
    res.status(200).json(products);
  }

  async insertProduct(req: Request, res: Response) {
    const data = req.body;
    const product = await this.productService.insertProduct(data);
    res.status(201).json(product);
  }
}
