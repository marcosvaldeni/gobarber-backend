import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../../../service/CreateUserService';

export default class UsersControllers {
  
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);
  
    const user = await createUser.execute({
      name,
      email,
      password,
    });
  
    const userWithoutPassword = { 
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    };
  
    return res.json(userWithoutPassword);
  }
}