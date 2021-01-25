/* eslint-disable camelcase */
import { Between, getRepository } from 'typeorm';

import { Router } from 'express';

import CreateSchendule from '../services/CreateSchedule';

import Schedule from '../models/Schedule';

import ensureAuthenticated from '../middlewares/ensureAuthenticared';

const schendulesRouter = Router();

schendulesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const scheduleRepository = getRepository(Schedule);

  const { dateInit, dateEnd } = request.query;

  let schendule: Schedule[] = [];

  if (dateInit) {
    schendule = await scheduleRepository.find({
      where: {
        user_id: request.user.id,
        canceled_at: null,
        date: Between(dateInit, dateEnd),
      },
      relations: ['nutritionist'],
      order: {
        date: 'ASC',
      },
    });
  } else {
    schendule = await scheduleRepository.find({
      where: {
        user_id: request.user.id,
        canceled_at: null,
      },
      relations: ['nutritionist'],
      order: {
        date: 'ASC',
      },
    });
  }

  global.logger.info(`GET /schendules - " ${request.user.id}`);

  return response.json(schendule);
});

schendulesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    user_id,
    date,
    description,
    recipe,
    prepare_mode,
    photo,
  } = request.body;

  const schenduleCreated = new CreateSchendule();

  const schendule = await schenduleCreated.execute({
    user_id,
    nutritionist_id: request.user.id,
    description,
    date,
    recipe,
    prepare_mode,
    photo,
  });

  global.logger.info(`POST /schendules - " ${JSON.stringify(request.body)}`);

  return response.json(schendule);
});

export default schendulesRouter;
