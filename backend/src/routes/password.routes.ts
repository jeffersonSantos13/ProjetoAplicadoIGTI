import { Router } from 'express';

import SendForgotPassowrdEmailService from '../services/SendForgotPasswordEmailService';
import ResetPasswordUserService from '../services/ResetPasswordUserService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
  const forgotPasswordUser = new SendForgotPassowrdEmailService();

  await forgotPasswordUser.execute({
    email: request.body.email,
  });

  global.logger.info(`POST /forgot - " ${request.body.email}`);

  return response.send();
});

passwordRouter.put('/forgot/:token', async (request, response) => {
  const resetPasswordUser = new ResetPasswordUserService();

  const user = await resetPasswordUser.execute({
    token: request.params.token,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });

  delete user.password;

  global.logger.info(`POST /forgot/token`);

  return response.json(user);
});

export default passwordRouter;
