// import { injectable, inject } from 'tsyringe';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import User from '../models/User';
import UserToken from '../models/UserToken';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';

import config from '../config/mail';

interface IRequest {
  email: string;
}

class SendForgotPassowrdEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (!checkUserExists) {
      throw new AppError('Usuário não existe.');
    }

    const userToken = getRepository(UserToken);

    const { secret, expiresIn } = config.token;

    const token = sign({}, secret, {
      subject: checkUserExists.id,
      expiresIn,
    });

    const code = Math.random().toString().slice(-6);

    const checkUserTokenExists = await userToken.findOne({
      where: { user_id: checkUserExists.id },
    });

    if (checkUserTokenExists) {
      checkUserTokenExists.token = token;
      checkUserTokenExists.codeToken = code;

      await userToken.save(checkUserTokenExists);
    } else {
      await userToken.save({
        user_id: checkUserExists.id,
        token,
        codeToken: code,
      });
    }

    if (!code) {
      throw new AppError(
        'Não foi possível criar o Token de recuperação de senha.',
        401,
      );
    }

    await ForgotPasswordMail.handle({
      email,
      user: checkUserExists,
      token: code,
    });
  }
}

export default SendForgotPassowrdEmailService;
