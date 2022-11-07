import { RowDataPacket } from 'mysql2';
import ILogin from '../interfaces/login.interface';
import IUser from '../interfaces/user.interface';
import mysql from './connection';

export default class LoginModel {
  connection = mysql;

  async getUserByLogin(login: ILogin) {
    const [result] = await this.connection.execute<IUser & RowDataPacket[]>(
      `SELECT * FROM Trybesmith.Users
      WHERE username = ? AND password = ?;`,
      [login.username, login.password],
    );

    return result;
  }
}
