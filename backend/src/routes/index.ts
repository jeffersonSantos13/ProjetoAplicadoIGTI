import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import passwordRouter from './password.routes';
import nutritionistRouter from './nutritionists.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users/password', passwordRouter);
routes.use('/nutritionists', nutritionistRouter);

export default routes;
