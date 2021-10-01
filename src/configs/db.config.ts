import { DatabaseConfig } from '@app-types/index';

const development: DatabaseConfig = {
    host     : 'localhost',
    //port     : 3306, 
    user     : 'root',
    password : '',
    database : 'udaan',
    
};

const staging: DatabaseConfig = {
    host     : 'http://localhost',
    port     : 3306, 
    user     : 'root',
    password : '',
    database : 'udaan'
};

const production: DatabaseConfig = {
    host     : 'http://localhost',
    port     : 3306, 
    user     : 'root',
    password : '',
    database : 'udaan'
};

export {
    development,
    staging,
    production
};