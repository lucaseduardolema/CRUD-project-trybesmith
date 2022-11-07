import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IProduct from '../interfaces/product.interface';
import mysql from './connection';

export default class ProductModel {
  connection = mysql;

  async getAllProducts(): Promise<IProduct[]> {
    const [products] = await this.connection.execute<IProduct[] & RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Products',
    );

    return products;
  }

  async insertProduct(data: IProduct): Promise<ResultSetHeader> {
    const [row] = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)', 
      [data.name, data.amount],
    );
    
    return row;
  }
}
