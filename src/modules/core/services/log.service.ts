import { BaseService } from '@modules/core/';

export default abstract class LogService extends BaseService {
    
    public static print(...args) {
        if (args?.length) {
            console.log(...args);
        }
    }

}
