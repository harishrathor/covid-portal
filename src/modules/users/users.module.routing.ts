import express from 'express';
import { UserControllerRouter } from '@modules/users/controllers/user';

const UsersModuleRouter = express.Router();

const controllerRouters = [ UserControllerRouter ];
const moduleUriPrefix = `users`;

for (const controllerRouter of controllerRouters) {
    UsersModuleRouter.use(`/${moduleUriPrefix}`, controllerRouter);
}

export { 
    UsersModuleRouter
};


