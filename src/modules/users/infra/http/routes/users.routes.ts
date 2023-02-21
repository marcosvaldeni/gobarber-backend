import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersControllers from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;