import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import Nutritionist from '../models/Nutritionist';

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

    const checkNutritionistExists = await nutritionistRepository.findOne({
      where: { email },
    });

    if (checkNutritionistExists) {
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

    await nutritionistRepository.save(nutritionist);

    return nutritionist;
  }
}

export default CreateUserService;
