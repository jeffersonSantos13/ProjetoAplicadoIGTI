import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';
import ConvertImgToBase64 from '../utils/ConvertImgToBase64';

import User from '../models/User';

interface Request {
  user_id: string;
  name: string;
  email: string;
  height: number;
  weight: number;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface Response {
  user: User;
}

class UpdateUserPersonalInformationService {
  public async execute({
    user_id,
    name,
    email,
    height,
    weight,
    cep,
    logradouro,
    complemento = '',
    bairro,
    localidade,
    uf,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Apenas usuário autenticado pode alterar as informações pessoais',
        401,
      );
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const checkUserExists = await usersRepository.findOne({
        where: { email },
      });

      if (checkUserExists && checkUserExists.id !== user_id) {
        throw new AppError('Endereço de Email se encontra em uso.');
      }

      user.email = email;
    }

    if (height) {
      user.height = height;
    }

    if (weight) {
      user.weight = weight;
    }

    if (cep) {
      user.cep = cep;
    }

    if (logradouro) {
      user.logradouro = logradouro;
    }

    if (complemento) {
      user.complemento = complemento;
    }

    if (bairro) {
      user.bairro = bairro;
    }

    if (localidade) {
      user.localidade = localidade;
    }

    if (uf) {
      user.uf = uf;
    }

    await usersRepository.save(user);

    const image = await ConvertImgToBase64({
      file: user.avatar,
    });

    user.avatar_url = `data:image/png;base64,${image}`;

    return { user };
  }
}

export default UpdateUserPersonalInformationService;
