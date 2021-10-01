export interface User {
    ID?: number;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    pinCode: number;
    phoneNumber: number;
    isAdmin: boolean;
};
export interface PartialUser {
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
    pinCode?: number;
    phoneNumber?: number;
};