import { PartialUser, User } from '@modules/users/types';
import express from 'express';
import { BaseController } from '@modules/core';
import UserDBService from '@modules/users/services/users-db.service';


const userService: UserDBService = UserDBService.getInstance();


export default class UserController extends BaseController {

    public async post(req: express.Request, res: express.Response) {
        try {
            this.sendResponse(res, 200, {greeting: 'POST: Hello from Controller 1 End Point 1.'});
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
        
    };

    public async get(req: express.Request, res: express.Response) {
        try {
            const userId = req.params.ID;
            const users =  await userService.getUsers(userId);
            this.sendResponse(res, 200, users);
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    }

    public async patch(req: express.Request, res: express.Response) {
        try {
            const body = (req.body as User);
            const userID = req.params.ID;
            const data = await userService.updateUser(userID, body);
            this.sendResponse(res, 200, data);
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    };

    public async put(req: express.Request, res: express.Response) {
        try {
            const body = (req.body);
            console.log('User bOdy', body);

            const data = await userService.createUser(body);
            let key = 'userId';
            if (body.isAdmin == '1') {
                key = 'adminId';
            }
            this.sendResponse(res, 201, {[key]: data.insertId});
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
        
    };

    public async delete(req: express.Request, res: express.Response) {
        try {
            const userID = Number(req.params.ID);
            const data = await userService.deleteUser(userID);
            this.sendResponse(res, 200, data);
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    }

}