import { ResultSetHeader } from 'mysql2';
import IUser from '../interfaces/user.interface';
import mysql from './connection';

export default class UserModel {
  connection = mysql;

  async insertUser(user: IUser): Promise<ResultSetHeader> {
    const [row] = await this.connection
      .execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [user.username, user.classe, user.level, user.password],
    );

    return row;
  }

  // async getUserByUsername(username: string): Promise<IUser> {
  //   const [result] = await this.connection.execute<IUser & RowDataPacket[]>(
  //     'SELECT * FROM Trybesmith.Users WHERE username = ?',
  //     [username],
  //   );
  //   return result;
  // }
}
