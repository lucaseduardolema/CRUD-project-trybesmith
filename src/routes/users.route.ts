import { Router } from 'express';
import UserController from '../controllers/users.controller';

const userRouter = Router();

const userController = new UserController();

userRouter
  .route('/')
  .post((req, res) => userController.insertUser(req, res));

export default userRouter;
