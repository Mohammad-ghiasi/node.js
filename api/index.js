const serverless = require('serverless-http');
const app = require('./blogs');

module.exports.handler = serverless(app);
