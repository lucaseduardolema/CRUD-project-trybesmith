import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  loginService = new LoginService();

  async login(req: Request, res: Response) {
    const user = req.body;
    const token = await this.loginService.getUserByLogin(user);
    res.status(200).json({ token });
  }
}
