import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';
import UserToken from '../models/UserToken';

import config from '../config/mail';

interface Request {
  token: string;
  password: string;
  confirmPassword: string;
}

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

class ResetPasswordUserService {
  public async execute({
    token,
    password,
    confirmPassword,
  }: Request): Promise<User> {
    const userTokenRepository = getRepository(UserToken);

    const checkTokenExists = await userTokenRepository.findOne({
      where: { token },
    });

    if (!checkTokenExists) {
      throw new AppError('Token informado inválido.');
    }

    try {
      verify(token, config.token.secret);
    } catch (err) {
      throw new AppError('Token de recuperação de senha expirado.');
    }

    const decoded = verify(token, config.token.secret);

    const { sub: id } = decoded as TokenPayLoad;

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('Usuário não existe.');
    }

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
