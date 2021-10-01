import express, { Router } from 'express';
import UserController from "./user.controller";
import ValidateUserController from "./validate-user.controller";

const user = new UserController();
const validateUser = new ValidateUserController();
const UserControllerRouter: Router = express.Router();
const apiVersions = ['v1'];
const controllerUriPrefix = `user`;

for (let version of apiVersions) {
    const uriPrefix = `/${version}/${controllerUriPrefix}`;
    
    UserControllerRouter.route(`${uriPrefix}/:ID/`)
    .post(user.post.bind(user))
    .patch(user.patch.bind(user))
    .delete(user.delete.bind(user))
    
    UserControllerRouter.route(`${uriPrefix}/:ID?/`)
    .get(user.get.bind(user))
    .put(user.put.bind(user))
    ;
    
    UserControllerRouter.route(`${uriPrefix}/validate-user/:ID/`)
    .get(validateUser.get.bind(validateUser));

}


export {
    UserControllerRouter 
};

