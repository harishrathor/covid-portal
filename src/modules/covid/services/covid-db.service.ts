import { ObjectType } from '@app-types/index';
//import UserModel from '@modules/users/models/user.modal';
import { DBQueryResult } from '@root/types/index';
import { User, PartialUser } from '@modules/users/types';
import { DBBaseService } from '@modules/core';

 
export default class CovidDBService extends DBBaseService {

    protected static _instance;


    public static getInstance() {
        if (!CovidDBService._instance) {
            CovidDBService._instance = new CovidDBService();
        }
        return CovidDBService._instance;
    }


    public getUsers(patientId?: string | number): Promise<User[] | DBQueryResult | any> {
        return this.simpleSelect('patients', (patientId ? {ID: patientId} : null));
    }

    public searchUsers(values: ObjectType): Promise<User[] | DBQueryResult | any> {
        return this.simpleSelect('patients', values);
    }

    public createUser(userData: User): Promise<DBQueryResult> {
        return this.simpleInsert('patients', userData)
    }

    public updateUser(patientId: string | number, userData: PartialUser): Promise<DBQueryResult | any> {
        return this.simpleUpdate('patients', userData, {ID: patientId})
    }

    public deleteUser(patientId: string | number): Promise<DBQueryResult  | any> {
        return this.simpleDelete('patients', {ID: patientId});
    }

    public getCovidePositivePatientsByPinCode(pinCode: number) {
        const query = `SELECT u.* from users u left join patients p on(u.ID = p.userID) WHERE p.result = 1 AND u.pinCode = ${pinCode} `;
        return this.runQueryPromise(query);
    }


    public getCovideNegativePatientsByPinCode(pinCode: number): any {
        const query = `SELECT u.* from users u left join patients p on(u.ID = p.userID) WHERE p.result = 0 AND u.pinCode = ${pinCode} `;
        console.log('qu', query);
        return this.runQueryPromise(query);
    }
    
}


