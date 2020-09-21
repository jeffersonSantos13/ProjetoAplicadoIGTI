import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import winston from 'winston';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

app.use(cors());
app.use(express.json());
app.use(routes);

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my.nutri-api.log' }),
  ],
  format: combine(label({ label: 'my.nutri-api' }), timestamp(), myFormat),
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    global.logger.info(
      `API ${err.message} - URL ${request.url} - Method(${request.method})`,
    );

    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  global.logger.info(
    `API Internal server error - URL ${request.url} - Method(${request.method})`,
  );

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  global.logger.info('API started!');
  console.log('Server started on port 3333!');
});
