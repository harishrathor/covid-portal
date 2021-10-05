import CovidService from './covid.service';
import { AreaFlags } from './../types/index';
import { expect } from "chai";

//Test Suit 1
const covidService: CovidService = CovidService.getInstance();
describe('Covid Zone Info Test', () => {

    //Test 1
    it('Covid Service Test RED ', () => {
        expect(covidService.getAreaColorByPatient(10)).to.be.equals(AreaFlags.RED);
    });

    //Test 2
    it('Covid Service Test GREEN ', () => {
        expect(covidService.getAreaColorByPatient(0)).to.be.equals(AreaFlags.GREEN);
    });

    //Test 3
    it('Covid Service Test ORANGE ', () => {
        expect(covidService.getAreaColorByPatient(4)).to.be.equals(AreaFlags.ORANGE);
    });

});
