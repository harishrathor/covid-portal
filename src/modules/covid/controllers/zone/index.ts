import express, { Router } from 'express';
import ZoneInfoController from '@modules/covid/controllers/zone/info.controller';


const zoneInfo = new ZoneInfoController();
const ZoneControllerRouter: Router = express.Router();
const apiVersions = ['v1'];
const controllerUriPrefix = `zone`;

for (let version of apiVersions) {
    const uriPrefix = `/${version}/${controllerUriPrefix}`;

    ZoneControllerRouter.route(`${uriPrefix}/info`)
    .get(zoneInfo.get.bind(zoneInfo))
    ;

}


export {
    ZoneControllerRouter 
};

