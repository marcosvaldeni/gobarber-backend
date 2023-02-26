import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import IMailProvider from 'shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository';



interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Request of password recovery received.');
  }
}

export default SendForgotPasswordEmailService;