import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  userService = new UserService();

  async insertUser(req: Request, res: Response) {
    const user = req.body;
    const token = await this.userService.insertUser(user);
    res.status(201).json({ token });
  }
}
