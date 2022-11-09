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

    const { username, password } = login;
    const encodedPass = btoa(password);

    const user = await this.loginModel.getUserByLogin({ username, password: encodedPass });
    if (user.length === 0) throw new HttpError(401, 'Username or password invalid');

    const { password: p, ...rest } = user[0];
    
    const token = createToken(rest);
    return token;
  }
}
