/* {"userId":"1","symptoms":["fever","cold","cough"],"travelHistory":true,"contactWithCovidPatient":true}
Sample response - {"riskPercentage": 95} */


export interface UserAssessment {
    userId: number;
    symptoms: string[];
    travelHistory: boolean;
    contactWithCovidPatient: boolean;
}

export interface Patient {
    ID?: number;
    userId: number;
    adminId: number;
    result: number;
}

export enum AreaFlags {
    GREEN = 'GREEN',
    ORANGE = 'ORANGE',
    RED = 'RED'
};