import express from 'express';
import { BaseController } from '@modules/core';
import { UserAssessment } from '@modules/covid/types';
import CovidService from '@root/modules/covid/services/covid.service';

const assessmentService: CovidService = CovidService.getInstance();

export default class AssessUserController extends BaseController {

    public async post(req: express.Request, res: express.Response) {
        try {
            const body = req.body;
            console.log('COadsflk', body);
           body.symptoms = body.symptoms.split(',');
           if (body.symptoms.length == 1 && body.symptoms[0] == '') {
            body.symptoms = [];
           }
           console.log('body', body);
           const riskPercentage = assessmentService.assessUser(body);
           this.sendResponse(res, 200, {riskPercentage});
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    }


}