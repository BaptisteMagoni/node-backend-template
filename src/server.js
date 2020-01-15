global.R = require('ramda');
global.Joi = require('@hapi/joi');
global.Boom = require('@hapi/boom');

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package.json');
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

const swaggerOptions = {
    info: {
        title: 'API Documentation',
        version: Pack.version
    }
};

const start = () =>
    server
        .register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger,
                options: swaggerOptions
            }
        ])
        .then(() => server.start())
        .then(() => Massive(config.postgres.connection.string))
        .then(massive => {
            const Models = require('./api/models/');
            const Handlers = require('./api/handlers');
            const Routes = require('./api/routes');
            Routes(server, Handlers(Models(massive)));
        });

module.exports = {
    server,
    start
};
