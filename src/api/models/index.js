module.exports = db => ({
    test(request, h) {
        return new Promise((resolve, reject) => {
            db.query('select ${value}', { value: request.params.test })
                .then(result => {
                    logger.debug('Test query');
                    resolve(result);
                })
                .catch(err => {
                    logger.error('error during test query');
                    reject(err);
                });
        });
    }
});
