import { parseISO } from 'date-fns';
import { Router } from 'express';

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import CreateAppointmentService from '../../../service/CreateAppointmentService';
import AppointmentsRepository from '../../repositories/AppointmentRepository';

const appointmentRouter = Router();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentRouter.post('/', async (req, res) => {

    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);

    const appointmentsRepository = new AppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return res.json(appointment);
});

// appointmentRouter.get('/', async (req, res) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();

//   return res.json(appointments);
// });

export default appointmentRouter;
