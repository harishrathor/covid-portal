import { User } from '@modules/users/types';
import { DBQueryResult } from './../../../types/index';
import UserDBService from './users-db.service';
import { expect } from "chai";

//Test Suit 1
const dbService: UserDBService = UserDBService.getInstance();
describe('Users DB Service Suit - 1', () => {
    let userId: number = 32;
    let findUser = (userId) => {
        dbService.getUsers(userId).then((result: User[]) => {
            expect(result.length, 'User Not Present').to.be.greaterThan(0);
            expect(result[0], 'User details does not contain User ID.').to.have.property('ID').to.be.equal(userId);
        });
    }

    //Test One
    it('Insert User', () => {
        const randomInt = Math.random() * 1000;
        const userData = {
            firstName: 'User ' + randomInt,
            lastName: 'Last ' + randomInt,
            age: 30,
            email: 'ramrathor1@yahoo.test' + randomInt,
            pinCode: 22345,
            phoneNumber: 3434645645,
            isAdmin: true
        };
        dbService.createUser(userData).then((result: DBQueryResult) => {
            console.log('Create User', result);
            userId = result.insertId;
            expect(result, 'InsertId check failed.').to.have.property('insertId');
            expect(result.insertId, 'InsertId value check failed').to.be.greaterThan(0);
            findUser(result.insertId);
        }, error => {
            console.log('Insertion Failed:', error);
        });

    });

      it('Select User Test', () => {
        findUser(userId);
    });

});
