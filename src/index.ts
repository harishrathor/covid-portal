
import Server from './server';
import { LogService } from '@modules/core';



function startServer(env: string) {
    var server = new Server(env);
    globalThis.SERVER = server;
    server.initialize((error, ...args) => {
        server.startServer();
    });
}

const args = process.argv
let env = args[2];
console.log('ARGS', args);
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
   

