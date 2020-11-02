import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  password: string;
  newPassword: string;
}

class ChangeUserPassword {
  public async execute({
    user_id,
    password,
    newPassword,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Usuário informado não encontrado.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Senha informada incorreta', 401);
    }

    if (!newPassword) {
      throw new AppError('Nova Senha não informado', 401);
    }

    const hashedPassoword = await hash(newPassword, 8);

    if (hashedPassoword) {
      user.password = hashedPassoword;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default ChangeUserPassword;
