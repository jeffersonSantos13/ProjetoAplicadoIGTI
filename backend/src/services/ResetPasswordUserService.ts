/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';
import UserToken from '../models/UserToken';

interface Request {
  user_id: string;
  user: User;
  password: string;
  confirmPassword: string;
}

class ResetPasswordUserService {
  public async execute({
    user_id,
    user,
    password,
    confirmPassword,
  }: Request): Promise<User> {
    const userTokenRepository = getRepository(UserToken);

    const checkTokenExists = await userTokenRepository.findOne({
      where: { user_id },
    });

    if (!checkTokenExists) {
      throw new AppError('Código informado inválido.');
    }

    const usersRepository = getRepository(User);

    if (password === '') {
      throw new AppError('Nova senha não informada');
    }

    if (confirmPassword === '') {
      throw new AppError('Confirmação de senha não informada');
    }

    if (password !== confirmPassword) {
      throw new AppError('Senhas informadas não conferem.');
    }

    const hashedPassoword = await hash(password, 8);

    user.password = hashedPassoword;

    await usersRepository.save(user);

    await userTokenRepository.remove(checkTokenExists);

    return user;
  }
}

export default ResetPasswordUserService;
