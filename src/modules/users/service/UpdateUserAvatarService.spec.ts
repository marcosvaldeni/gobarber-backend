import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpadateUserAvatarService from './UpdateUserAvatarService';

describe('CreateUser', () => {
  it('should be able to update a user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const upadateUserAvatar = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    await upadateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able update avatar from none existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const upadateUserAvatar = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(
      upadateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar when updating a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const upadateUserAvatar = new UpadateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Locki',
      email: 'johnlocki@email.com',
      password: '123123132'
    });

    await upadateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await upadateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'lulu.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('lulu.jpg');
  });
});