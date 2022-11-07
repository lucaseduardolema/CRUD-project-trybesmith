import { Router } from 'express';
import ProductController from '../controllers/products.controller';

const productRouter = Router();

const productController = new ProductController();

productRouter
  .route('/')
  .get((req, res) => productController.getAllProducts(req, res))
  .post((req, res) => productController.insertProduct(req, res));

export default productRouter;
