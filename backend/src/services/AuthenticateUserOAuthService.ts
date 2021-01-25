import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import path from 'path';

import authConfig from '../config/auth';
import ConvertImgToBase64 from '../utils/ConvertImgToBase64';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
  sub: string;
  providerId: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserOAuthService {
  public async execute({
    email,
    password,
    sub,
    providerId,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email/Senha informados incorretos', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email/Senha informados incorretos', 401);
    }

    if (user.sub !== sub || user.providerId !== providerId) {
      throw new AppError('Email/Senha informados incorretos', 401);
    }

    user.avatar_url = user.avatar;

    if (path.extname(user.avatar).includes('jpg, png')) {
      const imageProfile = user.avatar ? user.avatar : 'profile.png';

      const image = await ConvertImgToBase64({
        file: imageProfile,
      });

      user.avatar_url = `data:image/png;base64,${image}`;
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserOAuthService;
