import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { IsNull, Not } from "typeorm";


import User from '../models/User';

import UserProfileService from '../services/UserProfileService';
import ChangeUserPassword from '../services/ChangeUserPassword';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UpdateUserPersonalInformationService from '../services/UpdatePersonalInformationUserService';
import UpdateFirstLogin from '../services/UpdateFirstLogin';
import CreateUserOauth from '../services/CreateUserOauth';

import ensureAuthenticated from '../middlewares/ensureAuthenticared';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  /* where: {
    nutritionist_id: Not(IsNull()),
  }, */

  const user = await usersRepository.find();

  global.logger.info(`GET /users`);

  return response.json(user);
});

usersRouter.get('/nutritionists', async (request, response) => {
  const usersRepository = getRepository(User);

  const user = await usersRepository.find({
    relations: ['nutritionist'],
    select: [
      'id',
      'name',
      'email',
      'avatar',
      'cep',
      'logradouro',
      'complemento',
      'bairro',
      'localidade',
      'uf',
      'gender',
      'phone',
      'age',
    ],
    where: {
      nutritionist_id: Not(IsNull()),
    },
  });

  global.logger.info(`GET /users/nutritionists`);

  return response.json(user);
});

usersRouter.patch('/', ensureAuthenticated, async (request, response) => {
  const updateUser = new UpdateUserPersonalInformationService();

  const { user } = await updateUser.execute({
    user_id: request.user.id,
    name: request.body.name,
    email: request.body.email,
    height: request.body.height,
    weight: request.body.weight,
    cep: request.body.cep,
    logradouro: request.body.logradouro,
    complemento: request.body.complemento,
    bairro: request.body.bairro,
    localidade: request.body.localidade,
    uf: request.body.uf,
    gender: request.body.gender,
    desire_weight: request.body.desire_weight,
    phone: request.body.phone,
    age: request.body.age,
  });

  delete user.password;

  global.logger.info(
    `PATCH /users " ID: ${request.user.id} - ${JSON.stringify(request.body)}`,
  );

  return response.json(user);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  global.logger.info(`POST /users " ${name} - ${email}`);

  return response.json(user);
});

usersRouter.get('/oauth', async (request, response) => {
  const { email, providerId } = request.query;

  const usersRepository = getRepository(User);

  const user = await usersRepository.find({
    where: {
      email,
      providerId,
    },
  });

  delete user.password;

  global.logger.info(`GET /users/oauth " ${request.params}`);

  return response.json(user);
});

usersRouter.post('/oauth', async (request, response) => {
  const { name, email, password, sub, providerId } = request.body;

  const createUser = new CreateUserOauth();

  const user = await createUser.execute({
    name,
    email,
    password,
    sub,
    providerId,
  });

  delete user.password;

  global.logger.info(`POST /users/oauth " ${name} - ${email}`);

  return response.json(user);
});

usersRouter.delete('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);

  await usersRepository.delete(request.user.id);

  return response.send();
});

usersRouter.get('/profile', ensureAuthenticated, async (request, response) => {
  const userService = new UserProfileService();

  const userProfile = await userService.execute({
    user_id: request.user.id,
  });

  return response.json(userProfile);
});

usersRouter.patch(
  '/changePassword',
  ensureAuthenticated,
  async (request, response) => {
    const userService = new ChangeUserPassword();

    await userService.execute({
      user_id: request.user.id,
      password: request.body.password,
      newPassword: request.body.newPassword,
    });

    return response.send();
  },
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    let avatar = '';

    if (request.file !== undefined) {
      avatar = request.file.filename;
    } else {
      avatar = request.body.fileimage;
    }

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: avatar,
    });

    delete user.password;

    global.logger.info(`PATCH /users " ID: ${request.user.id}`);

    return response.json(user);
  },
);

export default usersRouter;
