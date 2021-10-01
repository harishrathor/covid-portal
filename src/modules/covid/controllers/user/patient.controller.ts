import { User } from '@modules/users/types';
import express from 'express';
import { BaseController } from '@modules/core';
import CovidDBService from '@modules/covid/services/covid-db.service';


const userService: CovidDBService = CovidDBService.getInstance();


export default class PatientController extends BaseController {

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
            const body = (req.body);
            let userID = req.params.ID;
            console.log('Update User', userID, parseInt(userID), isNaN(parseInt(userID)), body);
            if (isNaN(parseInt(userID))) {
                try {
                    console.log('If');
                    const userData = await userService.searchUsers({userId: body.userId, adminId: body.adminId});
                    console.log('userData', userData);
                    if (userData && userData.length) {
                        userID = userData[0].ID;
                    }
                } catch (error) {
                    return this.sendResponse(res, 500, error);    
                }
            }
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
            let key = 'recordId';
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