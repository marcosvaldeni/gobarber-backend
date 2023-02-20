
import { container } from 'tsyringe';

import IAppointmentsRepository from '../../modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointments/infra/repositories/AppointmentRepository';

import IUsersRepository from '../../modules/users/infra/typeorm/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', 
  AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
);
