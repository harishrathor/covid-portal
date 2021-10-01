import express from 'express';
import { BaseController } from '@modules/core';
import CovidService from '@root/modules/covid/services/covid.service';

const assessmentService: CovidService = CovidService.getInstance();

export default class ZoneInfoController extends BaseController {

    public async get(req: express.Request, res: express.Response) {
        try {
           const queryParams = req.query;
           const pinCode = Number(queryParams.pinCode);
           const count = await assessmentService.getCovidPositiveCountUserByPinCode(pinCode);
           const color = assessmentService.getAreaColorByPatient(count);
           console.log('queryPara', queryParams, pinCode, count, color);
           this.sendResponse(res, 200, {numCases: count, zoneType: color});
        } catch(e) {
            console.log(e);
            this.sendResponse(res, 500, e);
        }
    }


}