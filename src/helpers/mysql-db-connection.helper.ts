
import { DBConnection, DBConnector, DatabaseConfig, NodeCallback } from "@app-types/index";
import { LogService } from "@modules/core";

import mysql from 'mysql';


const connectionCallback = (error, ...args) => {
    if (error) {
        LogService.print('Error in DB connection.', error);
    } else {
        LogService.print('DB connection successfully created.', ...args);
    }
};

const connectionEndCallback = (error, ...args) => {
    if (error) {
        LogService.print('Error in closing DB connection.', error);
    } else {
        LogService.print('DB connection successfully closed.', ...args);
    }
};

function createConnection(config: DatabaseConfig, callback?: NodeCallback): DBConnection {
    const connection = mysql.createConnection(config);
    callback = (callback || connectionCallback)
    connection.connect(callback);
    return connection;
}

function closeConnection(connection: DBConnection, callback: NodeCallback) {
    callback = (callback || connectionEndCallback)
    connection.end(callback);
}

export const MYSQLConnector: DBConnector = {
    createConnection,
    closeConnection
};





