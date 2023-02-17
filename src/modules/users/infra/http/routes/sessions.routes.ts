import { Router } from 'express';

import AuthenticateUserService from '../../../service/AuthenticateUserService';

const seeeionsRouter = Router();

seeeionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (err: any) {
    return res.status(err.statusCode).json({ error: err.message });
  }
});

export default seeeionsRouter;