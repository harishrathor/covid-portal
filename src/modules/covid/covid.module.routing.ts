import express from 'express';
import { CovidUserRouter } from '@modules/covid/controllers/user';
import { ZoneControllerRouter } from './controllers/zone';

const CovidModuleRouter = express.Router();

const controllerRouters = [ CovidUserRouter, ZoneControllerRouter ];
const moduleUriPrefix = `covid`;

for (const controllerRouter of controllerRouters) {
    CovidModuleRouter.use(`/${moduleUriPrefix}`, controllerRouter);
}

export { 
    CovidModuleRouter
};


