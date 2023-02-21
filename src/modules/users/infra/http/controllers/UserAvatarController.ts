import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '../../../service/UpdateUserAvatarService';

export default class UserAvatarController {
  
  public async update(req: Request, res: Response): Promise<Response> {
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
  }
}