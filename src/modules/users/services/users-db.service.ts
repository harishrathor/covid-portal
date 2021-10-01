import UserModel from '@modules/users/models/user.modal';
import { DBQueryResult } from '@root/types/index';
import { User, PartialUser } from '@modules/users/types';
import { DBBaseService } from '@modules/core';

 
export default class UserDBService extends DBBaseService {

    protected static _instance;


    public static getInstance() {
        if (!UserDBService._instance) {
            UserDBService._instance = new UserDBService();
        }
        return UserDBService._instance;
    }


    public getUsers(userID?: string | number): Promise<User[] | DBQueryResult | any> {
        return this.simpleSelect('users', (userID ? {ID: userID} : null));
    }

    public createUser(userData: User): Promise<DBQueryResult> {
        return this.simpleInsert('users', userData)
    }

    public updateUser(userID: string | number, userData: PartialUser): Promise<DBQueryResult | any> {
        return this.simpleUpdate('users', userData, {ID: userID})
    }

    public deleteUser(userID: string | number): Promise<DBQueryResult  | any> {
        return this.simpleDelete('users', {ID: userID});
    }
    
}


