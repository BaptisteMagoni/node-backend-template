module.exports = (server, handlers) => {
    server.route({
        method: 'GET',
        path: '/api/{test}',
        options: {
            handler: (request, h) => {
                return handlers.test(request, h);
            },
            description: 'Test route',
            tags: ['api'],
            validate: {
                params: Joi.object({
                    test: Joi.string()
                        .required()
                        .description('Test param')
                })
            }
        }
    });
};
