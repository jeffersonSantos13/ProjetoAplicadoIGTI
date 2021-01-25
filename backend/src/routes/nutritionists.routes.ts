/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { Router } from 'express';

import Nutritionist from '../models/Nutritionist';

import CreateNutritionistService from '../services/CreateNutritionistService';
import UpdateNutritionistService from '../services/UpdateNutritionistService';

import ensureAuthenticated from '../middlewares/ensureAuthenticared';

const nutritionistRouter = Router();

nutritionistRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(Nutritionist);

  const user = await usersRepository.find();

  global.logger.info(`GET /nutritionists`);

  return response.json(user);
});

nutritionistRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    subscription,
    CRN,
    situation,
    registration_Type,
  } = request.body;

  const createNutritionist = new CreateNutritionistService();

  const nutritionist = await createNutritionist.execute({
    name,
    email,
    password,
    subscription,
    CRN,
    situation,
    registration_Type,
  });

  delete nutritionist.password;

  global.logger.info(`POST /nutritionists " ${JSON.stringify(nutritionist)}`);

  return response.json(nutritionist);
});

/* nutritionistRouter.put('/', ensureAuthenticated, async (request, response) => {
  const {
    name,
    email,
    password,
    subscription,
    CRN,
    situation,
    registration_Type,
  } = request.body;

  const updateNutritionist = new UpdateNutritionistService();

  const nutritionist = await updateNutritionist.execute({
    name,
    email,
    password,
    subscription,
    CRN,
    situation,
    registration_Type,
  });

  delete nutritionist.password;

  global.logger.info(`PUT /nutritionists " ${JSON.stringify(nutritionist)}`);

  return response.json(nutritionist);
}); */

/* nutritionistRouter.delete(
  '/:id',
  ensureAuthenticated,
  async (request, response) => {
    const nutritionistRepository = getRepository(Nutritionist);

    await nutritionistRepository.delete(request.params.id);

    return response.send();
  },
); */

export default nutritionistRouter;
