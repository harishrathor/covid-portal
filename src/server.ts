import  express from 'express';
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
import PATHS from './paths'
import { ObjectType, DBConnection,  NodeCallback /* , DBConnector, DatabaseConfig*/ } from '@app-types/index';
import { DBConfig } from "@configs/index";
import { MYSQLConnector } from './helpers';
import { LogService } from '@modules/core';


export default class Server {

    public PATHS: ObjectType | undefined;
    public ENV: string;
    public CONFIGS: ObjectType;
    public APP: express.Application;
    public SingletonInstances: ObjectType;
    

    protected _serverInstance: any;
    protected _dbConnection: DBConnection;

    constructor(env: string) {
        this.ENV = env;
    }

    initialize(callback: NodeCallback) {
       // this.
        this.SingletonInstances = {};
        this.PATHS = PATHS;
        this.APP = express();
        this._registerMiddlwares();
        this._initRouting();
        this._connectDB(callback);
    }

    isDev() {
        return this.ENV === 'development';
    }

    isProduction() {
        return this.ENV === 'production';
    }

    public setSingletonInstance(className: string, instance: any) {
        return this.SingletonInstances[className] = instance;
    }

    public getSingletonInstance(className: string) {
        return this.SingletonInstances[className]
    }

    protected _initRouting() {
        require('@routes');
    }

    protected _connectDB(callback?: NodeCallback) {
        const config = DBConfig[globalThis.SERVER.ENV];
        this._dbConnection = MYSQLConnector.createConnection(config, (error, ...args) => {
            callback && callback(error, ...args);
            this._onDBConnection(error, ...args);
        });   
    }

    protected _onDBConnection(error, ...args) {
        if (error) {
            LogService.print('Error in DB connection.', error);

        } else {
            LogService.print('DB connection successfully created.', ...args);
        }
    }

    protected _registerMiddlwares() {
        this.APP.use(express.static(this.PATHS.SERVER_ASSETS));
        this.APP.use(cookieParser());
        this.APP.use(compression());
        this.APP.use(helmet());
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({extended: true}));
        if (this.isDev()) {
            this.APP.use(logger('dev'));
        }
    }

    protected _displayServerInfo() {
        const { networkInterfaces } = require('os');
        const nets = networkInterfaces();
        const results = Object.create(null); // Or just '{}', an empty object

        for (const name of Object.keys(nets)) {
            for (const net of nets[name]) {
                // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
                if (net.family === 'IPv4' && !net.internal) {
                    if (!results[name]) {
                        results[name] = [];
                    }
                    results[name].push(net.address);
                }
            }
        }
        console.log(results);
    }

    startServer() {
      const PORT = (process.env.PORT || 3000);
        this._serverInstance = this.APP.listen(PORT, () => console.log(`Server (${this.ENV}) started at port ${PORT}. Process id ${process.pid} and Parent process id ${process.ppid}`));
       // this._displayServerInfo();
    }

    stopServer() {
        if (this._serverInstance) {
            this._serverInstance.close();
        }
    }

    all(req: express.Request, res: express.Response, next: any) { //Called for all request. 
        next(req, res);
    }

    public getDBConnection(): DBConnection {
        return this._dbConnection;
    }

    public closeDBConnection() {
        try {
            const connection = globalThis.SERVER.getDBConnection();
            MYSQLConnector.closeConnection(connection);
        } catch (error) {
            LogService.print(error);            
        }
    }

}



