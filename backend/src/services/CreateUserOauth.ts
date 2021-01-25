import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  sub: string;
  providerId: string;
}

class CreateUserOauth {
  public async execute({
    name,
    email,
    password,
    sub,
    providerId,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Endereço de Email se encontra em uso.');
    }

    const hashedPassoword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassoword,
      sub,
      providerId,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserOauth;
