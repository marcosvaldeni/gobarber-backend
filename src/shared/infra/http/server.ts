import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from '../../../config/upload';
import '../../container';

import '../typeorm';
import AppError from '../../errors/AppError';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.get('/', (req, res) => {
  return res.json({ message: 'GoBarber' });
});

app.listen(3333, () => {
  console.log('🤖 Server started on port 3333!');
});
