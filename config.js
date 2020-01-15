// Read .env
require('dotenv').config();

const commonEnv = require('common-env/withLogger')(console);

// Set log level to 'debug' by default
const log4js = require('log4js');
global.logger = log4js.getLogger();
logger.level = 'debug';

// Define ENV var if they are not in the .env
module.exports = commonEnv.getOrElseAll({
    api: {
        host: 'localhost',
        port: 10000
    },
    postgres: {
        connection: { string: 'postgresql://sergtsop:sergtsop@database.ebacala.ovh:54320/postgres' }
    }
});
