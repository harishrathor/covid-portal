import express from 'express';
import path from 'path';

const rootRouter = express.Router();

const modulesRouters = [];

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
