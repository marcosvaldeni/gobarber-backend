import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import CreateUsersService from '../service/CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakesUsersRepository';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const creatUser = new CreateUsersService(
      fakeUsersRepository,
    );

    const user = await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const creatUser = new CreateUsersService(
      fakeUsersRepository,
    );

    await creatUser.execute({
      name: 'John Snow',
      email: 'johnsnow@email.com',
      password: '123456',
    });

    expect(
      creatUser.execute({
        name: 'John Snow',
        email: 'johnsnow@email.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});