import { Connection, ConnectionConfig, OkPacket } from '@types/mysql';

export interface ObjectType {
    [key: string]: any
};

export type NodeCallback = (error: Error, ...args: any) => void;
export type DBQueryCallback = (error: Error, result: any, fields: any, ...args: any) => void;

export interface DBConnection extends Connection {

}

export interface DBConnector  {
    createConnection: (config: DatabaseConfig, callback?: NodeCallback) => DBConnection;
    closeConnection: (connection: DBConnection, callback?: NodeCallback) => void;
};


export interface DatabaseConfig extends ConnectionConfig {
    
};

export interface DBQueryResult extends OkPacket {

}
