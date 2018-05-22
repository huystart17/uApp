/* eslint-disable no-console */
const logger = require('winston');
const signale = require('signale');

const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) => logger.error('Unhandled Rehrjection at: Promise ', p, reason));

server.on('listening', () =>
    //              logger.info('Feathers application started on http://%s:%d', app.get('host'), port));
    signale.info('Feathers application started on ', app.get('host'), ':', port),
);
