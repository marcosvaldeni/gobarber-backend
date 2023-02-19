import { Router } from 'express';
import UsersRepository from 'modules/users/repositories/UsersRepository';

import AuthenticateUserService from '../../../service/AuthenticateUserService';

const seeeionsRouter = Router();

seeeionsRouter.post('/', async (req, res) => {

  const { email, password } = req.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return res.json({ user, token });
});

export default seeeionsRouter;