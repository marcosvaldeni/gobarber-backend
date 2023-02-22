import { v4 as uuid } from 'uuid';

import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import Appointment from "../../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../IAppointmentsRepository";

class AppointmentsRepository implements IAppointmentsRepository {
	private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {

		const findAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return findAppointment;
  }

  public async create({ 
		provider_id, 
		date 
	}: ICreateAppointmentDTO): Promise<Appointment> {

		const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;