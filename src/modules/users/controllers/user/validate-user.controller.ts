import express from 'express';
import { BaseController } from '@modules/core';
import UserDBService from '@modules/users/services/users-db.service';

const userService: UserDBService = UserDBService.getInstance();

export default class ValidateUserController extends BaseController {

    public async get(req: express.Request, res: express.Response) {
        try {
            const userID = req.params.ID;
            if (!userID) {
                this.sendResponse(res, 400);
            } else {
                const data = await userService.getUsers(userID);
                this.sendResponse(res, 200, data);
            }
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    }

    

}