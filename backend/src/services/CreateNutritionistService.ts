/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Nutritionist from '../models/Nutritionist';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  subscription: number;
  CRN: string;
  situation: string;
  registration_Type: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    subscription,
    CRN,
    situation,
    registration_Type,
  }: Request): Promise<Nutritionist> {
    const nutritionistRepository = getRepository(Nutritionist);
    const usersRepository = getRepository(User);

    const checkNutritionistExists = await nutritionistRepository.findOne({
      where: { email },
    });

    if (checkNutritionistExists) {
      throw new AppError('Endereço de Email se encontra em uso.');
    }

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Endereço de Email se encontra em uso.');
    }

    const hashedPassoword = await hash(password, 8);

    const nutritionist = nutritionistRepository.create({
      name,
      email,
      password: hashedPassoword,
      subscription,
      CRN,
      situation,
      registration_Type,
    });

    const newNutritionist = await nutritionistRepository.save(nutritionist);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassoword,
      nutritionist_id: newNutritionist.id,
    });

    await usersRepository.save(user);

    return nutritionist;
  }
}

export default CreateUserService;
