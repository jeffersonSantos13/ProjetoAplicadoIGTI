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

class UpdateNutritionistService {
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
  })
}

export default UpdateNutritionistService;
