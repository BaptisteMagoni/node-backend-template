global.config = require('./config.js');

const { server, start } = require('./src/server');

start()
    .then(() => {
        console.log('Server up and running:', server.info.uri);
    })
    .catch(error => {
        console.log('Something went wrong !', error);
        process.exit(1);
    });
