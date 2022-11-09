import IUser from '../interfaces/user.interface';
import UserModel from '../models/users.model';
import HttpError from '../utils/httpError';
import { createToken } from '../utils/jwt';
import userSchema from './schemas/user.schema';

export default class UserService {
  userModel = new UserModel();

  async insertUser(user: IUser) {
    const { error } = userSchema.validate(user);
    if (error) {
      const code = error.message.includes('is required') ? 400 : 422;
      throw new HttpError(code, error.message);
    }

    const { password } = user;
    const encodedPass = btoa(password);

    const { affectedRows } = await this.userModel.insertUser({ ...user, password: encodedPass });
    if (affectedRows === 0) throw new HttpError(500, 'Internal Error');

    const { password: p, ...rest } = user;    
    const token = createToken(rest);
    return token;
  }
}
