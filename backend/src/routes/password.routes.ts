import { Router } from 'express';

import SendForgotPassowrdEmailService from '../services/SendForgotPasswordEmailService';
import ResetPasswordUserService from '../services/ResetPasswordUserService';
import VerifyTokenIsvalid from '../services/VerifyTokenIsvalid';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
  const forgotPasswordUser = new SendForgotPassowrdEmailService();

  await forgotPasswordUser.execute({
    email: request.body.email,
  });

  global.logger.info(`POST /forgot - " ${request.body.email}`);

  return response.send();
});

passwordRouter.post('/forgot/code', async (request, response) => {
  const verifyTokenIsvalid = new VerifyTokenIsvalid();

  const user = await verifyTokenIsvalid.execute({
    code: request.body.code,
  });

  return response.json(user);
});

passwordRouter.put('/forgot/:user_id', async (request, response) => {
  const resetPasswordUser = new ResetPasswordUserService();

  const user = await resetPasswordUser.execute({
    user_id: request.params.user_id,
    user: request.body.user,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
  });

  delete user.password;

  global.logger.info(`POST /forgot/token`);

  return response.json(user);
});

export default passwordRouter;
