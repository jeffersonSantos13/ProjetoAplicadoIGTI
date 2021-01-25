import { getRepository } from 'typeorm';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import User from '../models/User';
import UserToken from '../models/UserToken';

import config from '../config/mail';

interface Request {
  code: string;
}

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

interface Response {
  user: User;
  token: string;
}

class VerifyTokenIsvalid {
  public async execute({ code }: Request): Promise<Response> {
    const userTokenRepository = getRepository(UserToken);

    const checkTokenExists = await userTokenRepository.findOne({
      where: { codeToken: code },
    });

    if (!checkTokenExists) {
      throw new AppError('Código informado inválido.');
    }

    const { token } = checkTokenExists;

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

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default VerifyTokenIsvalid;
