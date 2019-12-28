global._ = require('lodash');
global.Boom = require('boom');
global.Joi = require('joi');

const Hapi = require('hapi');
const Inert = require('inert');
const Massive = require('massive');

const server = new Hapi.Server({
    host: config.api.host,
    port: config.api.port,
    routes: {
        cors: {
            origin: ['*'],
            credentials: true
        }
    }
});

const start = () =>
    server
        .register([Inert])
        .then(() => server.start())
        .then(() => Massive(config.postgres.connectionString))
        .then(massive => {
            const Models = require('./api/models/');
            const Handlers = require('./api/handlers');
            const Validations = require('./api/validations');
            const Routes = require('./api/routes');
            Routes(server, Handlers(Models(massive)), Validations());
        });

module.exports = {
    server,
    start
};
