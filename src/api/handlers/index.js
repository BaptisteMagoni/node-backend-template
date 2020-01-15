module.exports = models => ({
    test(request, h) {
        return models
            .test(request, h)
            .then(result => result)
            .catch(err => {
                return Boom.badRequest('Unknown error');
            });
    }
});
