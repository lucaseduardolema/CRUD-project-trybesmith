import ILogin from '../interfaces/login.interface';
import LoginModel from '../models/login.model';
import loginSchema from './schemas/login.schema';
import HttpError from '../utils/httpError';
import { createToken } from '../utils/jwt';

export default class LoginService {
  loginModel = new LoginModel();

  async getUserByLogin(login: ILogin) {
    const { error } = loginSchema.validate(login);
    if (error) throw new HttpError(400, error.message);

    const user = await this.loginModel.getUserByLogin(login);
    if (user.length === 0) throw new HttpError(401, 'Username or password invalid');

    const { password, ...rest } = user[0];
    
    const token = createToken(rest);
    return token;
  }
}
