import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import ILogin from '../interfaces/login.interface';

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const user = req.body as ILogin;
    const token = await this.loginService.getUserByLogin(user);
    res.status(200).json({ token });
  }
}
