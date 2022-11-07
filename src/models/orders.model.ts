import { ResultSetHeader, RowDataPacket } from 'mysql2';
import IOrder from '../interfaces/order.interface';
import mysql from './connection';

export default class OderModel {
  connection = mysql;

  async getAllOrders(): Promise<IOrder[]> {
    const [orders] = await this.connection.execute<IOrder[] & RowDataPacket[]>(
      `SELECT DISTINCT o.id, o.userId, 
      (SELECT JSON_ARRAYAGG(p.id) 
      FROM Trybesmith.Products p 
      WHERE p.orderId = o.id) productsIds 
      FROM Trybesmith.Orders o
      INNER JOIN Trybesmith.Products p
      WHERE p.orderId = o.id
      ORDER BY o.id;`,
    );
    return orders;
  }

  async insertUserIdOrder(userId: number | undefined): Promise<ResultSetHeader> {
    const [row] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUE (?)',
      [userId],
    );
    return row;
  }

  async insertOrder(orderId: number, productId: number) {
    const result = await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
      [orderId, productId],
    );
    return result;
  }
}
