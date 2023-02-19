import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {    
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMarched = await compare(password, user.password);

    if (!passwordMarched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;