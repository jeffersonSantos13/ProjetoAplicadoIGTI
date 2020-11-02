import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import User from '../models/User';

import UserProfileService from '../services/UserProfileService';
import ChangeUserPassword from '../services/ChangeUserPassword';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import UpdateUserPersonalInformationService from '../services/UpdatePersonalInformationUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticared';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(User);

  const user = await usersRepository.find();

  global.logger.info(`GET /users`);

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

usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);

  await usersRepository.delete(request.params.id);

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

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    global.logger.info(
      `POST /users " ID: ${request.user.id} - ${request.file.filename}`,
    );

    return response.json(user);
  },
);

export default usersRouter;
