import { Router } from 'express';
import path from 'path';
import { UsersModuleRouter } from '@modules/users';
import { CovidModuleRouter } from '@modules/covid'

const rootRouter = Router();

const modulesRouters = [ UsersModuleRouter, CovidModuleRouter ];

rootRouter.all(globalThis.SERVER.all);
rootRouter.get('/', (req, res) => {
    res.send('Hello World').end();    
});

rootRouter.get('/assets/*', (req, res) => {
    res.sendFile(path.join(globalThis.SERVER.PATHS.globalThis.SERVER_ASSETS, req.url.replace('/assets', '')));
});

for (const moduleRouter of modulesRouters) {
    rootRouter.use('/api', moduleRouter);
}

globalThis.SERVER.APP.use(rootRouter);
