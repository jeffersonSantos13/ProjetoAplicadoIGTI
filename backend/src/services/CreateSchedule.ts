/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import AppError from '../errors/AppError';

import User from '../models/User';
import Nutritionist from '../models/Nutritionist';
import Schedule from '../models/Schedule';

interface Request {
  user_id: string;
  nutritionist_id: string;
  description: string;
  date: Date;
  recipe: Array<string>;
  prepare_mode: string;
  photo: string;
}

class CreateSchendule {
  public async execute({
    user_id,
    nutritionist_id,
    description,
    date,
    recipe,
    prepare_mode,
    photo,
  }: Request): Promise<Schedule> {
    const usersRepository = getRepository(User);
    const nutritionistRepository = getRepository(Nutritionist);
    const scheduleRepository = getRepository(Schedule);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Usuário informado não encontrado.', 401);
    }

    if (user_id === nutritionist_id) {
      throw new AppError(
        'Usuário não pode criar um compromisso para ele mesmo.',
        401,
      );
    }

    const user_nutritionist = await usersRepository.findOne(nutritionist_id);

    if (!user_nutritionist) {
      throw new AppError('Apenas nutricionistas podem criar tarefas.', 401);
    }

    const nutritionist = await nutritionistRepository.findOne({
      where: {
        id: user_nutritionist.nutritionist_id,
      },
    });

    if (!nutritionist) {
      throw new AppError('Nutricionista informado não encontrado.', 401);
    }

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      throw new AppError('Data passada não é permitida', 401);
    }

    const checkAvailability = await scheduleRepository.findOne({
      where: {
        nutritionist_id: nutritionist.id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      throw new AppError('Data não disponível', 401);
    }

    const schedule = scheduleRepository.create({
      user_id,
      nutritionist_id: nutritionist.id,
      description,
      date: hourStart,
      recipe: recipe.join(','),
      prepare_mode,
      photo,
    });

    await scheduleRepository.save(schedule);

    return schedule;
  }
}

export default CreateSchendule;
