

import { Patient, AreaFlags } from '@modules/covid/types/index';
import CovidDBService from '@modules/covid/services/covid-db.service';
import { UserAssessment } from '@modules/covid/types';
import { BaseService } from '@modules/core';

 
const covidDBService: CovidDBService = CovidDBService.getInstance();

export default class CovidService extends BaseService {

    protected static _instance;

    public static getInstance() {
        if (!CovidService._instance) {
            CovidService._instance = new CovidService();
        }
        return CovidService._instance;
    }
    /* export interface UserAssessment {
        userId: number;
        symptoms: string[];
        travelHistory: boolean;
        contactWithCovidPatient: boolean;
    } */
    /* 
    No symptoms, No travel history, No contact with covid positive patient - Risk = 5%
    Any one symptom, travel history or contact with covid positive patient is true - Risk = 50%
    Any two symptoms, travel history or contact with covid positive patient is true - Risk = 75%
    Greater than 2 symptoms, travel history or contact with covid positive patient is true - Risk = 95%

    */
    public assessUser(data: UserAssessment): number {
        let riskPercentage = 5;
        const { symptoms, travelHistory, contactWithCovidPatient } = data;
        if (symptoms.length == 1 && (travelHistory || contactWithCovidPatient)) {
            riskPercentage = 50;
        } else if (symptoms.length == 2 && (travelHistory || contactWithCovidPatient)) {
            riskPercentage = 75;
        } else if (symptoms.length > 2 || (travelHistory || contactWithCovidPatient)) {
            riskPercentage = 95;
        }
        return riskPercentage;
    }

    public getCovidPositiveCountUserByPinCode(pinCode: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const patients: any = await covidDBService.getCovidePositivePatientsByPinCode(pinCode);
                if (patients && patients.length) {
                    resolve(patients.length);
                } else {
                    resolve(0);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public getAreaColorByPatient(count: number) {
        let flag = AreaFlags.GREEN;
        if (count == 0) {
            flag = AreaFlags.GREEN;
        } else if (count < 5) {
            flag = AreaFlags.ORANGE;
        } else if (count > 0) {
            flag = AreaFlags.RED;
        }
        return flag;
    }

}


