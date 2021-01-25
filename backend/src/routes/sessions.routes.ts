import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import AuthenticateUserOAuthService from '../services/AuthenticateUserOAuthService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  delete user.password;

  global.logger.info(`POST /sessions - " ${email}`);

  return response.json({ user, token });
});

sessionsRouter.post('/oauth', async (request, response) => {
  const { email, password, sub, providerId } = request.body;

  const authenticateUser = new AuthenticateUserOAuthService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
    sub,
    providerId,
  });

  delete user.password;

  global.logger.info(`POST /sessions/oauth - " ${email}`);

  return response.json({ user, token });
});

export default sessionsRouter;
