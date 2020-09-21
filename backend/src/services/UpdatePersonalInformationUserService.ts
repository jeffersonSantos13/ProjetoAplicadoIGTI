import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  height: number;
  weight: number;
  cep: string;
  logradouro: string;
  complemento?: string;
  bairro: string;
  localidade: string;
  uf: string;
}

class UpdateUserPersonalInformationService {
  public async execute({
    user_id,
    height,
    weight,
    cep,
    logradouro,
    complemento = '',
    bairro,
    localidade,
    uf,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError(
        'Apenas usuário autenticado pode alterar as informações pessoais',
        401,
      );
    }

    if (!height || height < 0) {
      throw new AppError('Altura não informado', 401);
    }

    if (!weight || weight < 0) {
      throw new AppError('Peso não informado', 401);
    }

    if (cep === '') {
      throw new AppError('CEP não informado', 401);
    }

    if (logradouro === '') {
      throw new AppError('Logradouro não informado', 401);
    }

    if (bairro === '') {
      throw new AppError('Bairro não informado', 401);
    }

    if (localidade === '') {
      throw new AppError('Cidade não informado', 401);
    }

    if (uf === '') {
      throw new AppError('UF não informado', 401);
    }

    user.height = height;
    user.weight = weight;
    user.cep = cep;
    user.logradouro = logradouro;
    user.complemento = complemento;
    user.bairro = bairro;
    user.localidade = localidade;
    user.uf = uf;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserPersonalInformationService;
