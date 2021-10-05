
import Server from './server';
import { LogService } from '@modules/core';

function startServer(env: string) {
    const server = new Server(env);
    LogService.print("Creating Server.");
    Object.defineProperty(globalThis, 'SERVER', {
        get() {
            LogService.print('Getting Server');
            return server;
        }
    });
    LogService.print("Initializing Server.");
    server.initialize((error, ...args) => {
        LogService.print("Initialized Server.");
        LogService.print("Starting Server.");
        server.startServer();
    });
}

const args = process.argv
let env = args[2];
if (!env || env != 'production' && env != 'development') {
    env = 'development';
}
startServer(env);

process.on('exit', (code) => {
    LogService.print(`Process with ID ${process.pid} exit with code ${code}.`);
    globalThis.SERVER.closeDBConnection();
})
process.on('uncaughtException', (error) => {
    LogService.print(`Process with ID ${process.pid} exit got uncaughtException:`, error);
    globalThis.SERVER.closeDBConnection();
});
process.on('unhandledRejection', (reason) => {
    LogService.print(`Process with ID ${process.pid} exit got unhandledRejection:`, reason);
    globalThis.SERVER.closeDBConnection();
});
   

/* 

import Server from './server';
import { LogService } from '@modules/core';

const args = process.argv
let env = args[2];
console.log('ARGS', args);
if (!env || env != 'production' && env != 'development') {
    env = 'development';
}
const server = Server.startServer(env);
Object.defineProperty(globalThis, 'SERVER', {
    get() {
        console.log('Getting Server');
        return server;
    }
});

process.on('exit', (code) => {
    LogService.print(`Process with ID ${process.pid} exit with code ${code}.`);
    globalThis.SERVER.closeDBConnection();
})
process.on('uncaughtException', (error) => {
    LogService.print(`Process with ID ${process.pid} exit got uncaughtException:`, error);
    globalThis.SERVER.closeDBConnection();
});
process.on('unhandledRejection', (reason) => {
    LogService.print(`Process with ID ${process.pid} exit got unhandledRejection:`, reason);
    globalThis.SERVER.closeDBConnection();
});
   


*/

