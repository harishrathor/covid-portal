import { User } from '@modules/users/types';
import BaseModel from '@root/models/base.model';

export default class UserModel extends BaseModel<User> implements User {

    public firstName: string;
    public lastName: string;
    public age: number;
    public email: string;
    public pinCode: number;
    public phoneNumber: number;

}
