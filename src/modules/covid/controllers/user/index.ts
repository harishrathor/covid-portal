import express, { Router } from 'express';
import AssessUserController from '@modules/covid/controllers/user/assess-user.controller';
import PatientController from '@modules/covid/controllers/user/patient.controller';

const user = new AssessUserController();
const patient = new PatientController();
const CovidUserRouter: Router = express.Router();
const apiVersions = ['v1'];
const controllerUriPrefix = `user`;

for (let version of apiVersions) {
    const uriPrefix = `/${version}/${controllerUriPrefix}`;

    CovidUserRouter.route(`${uriPrefix}/assess`)
    .post(user.post.bind(user));

    CovidUserRouter.route(`${uriPrefix}/:ID?`)
    .post(patient.post.bind(patient))
    .patch(patient.patch.bind(patient))
    .delete(patient.delete.bind(patient))
    
    CovidUserRouter.route(`${uriPrefix}/:ID?/`)
    .get(patient.get.bind(patient))
    .put(patient.put.bind(patient))
    ;

}


export {
    CovidUserRouter 
};

