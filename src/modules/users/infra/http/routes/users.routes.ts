import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import CreateUserService from '../../../service/CreateUserService';
import UpdateUserAvatarService from '../../../service/UpdateUserAvatarService';
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
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
});

usersRouter.patch('/avatar', ensureAuthenticated,
  upload.single('avatar'), async (req, res) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file!.filename,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return res.json(userWithoutPassword);

  },
);

export default usersRouter;