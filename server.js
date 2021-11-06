'use strict';

/**
 * Module dependencies.
 */
const app = require('./app');

// .extend adds a .withShutdown prototype method to the Server object
require('http-shutdown').extend();
const http = require('http');

/**
 * Create HTTP server.
 */
const server = http.createServer().withShutdown();

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const addr = server.address();
    const bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

function exitHandler() {
    console.log('Shutting down HTTP server...');
    server.shutdown(() => process.exit(7));
}

server.on('request', app);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Setup exit handlers
 */
process.on('SIGTERM', () => exitHandler());
process.on('SIGINT', () => exitHandler());
process.on('exit', () => exitHandler());

module.exports = server;