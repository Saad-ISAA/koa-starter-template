const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')(/* Add your cors option */);
const logger = require('koa-logger')();
// const ip = require('koa-ip');

const {
  errors: errorHandler,
  security: securityHandler,
  authenticate: authHandler,
} = require('./middleware');
const applyApiMiddleware = require('./api');
const { isDevelopment } = require('./config');

const server = new Koa();

/**
 * Add here only development middlewares
 */
if (isDevelopment) {
  server.use(logger);
}

/**
 * Pass to our server instance middlewares
 */
server
  .use(errorHandler)
  .use(authHandler)
  .use(securityHandler)
  .use(compress)
  .use(cors)
  .use(bodyParser);
// .use(ip);

/**
 * Apply to our server the api router
 */
applyApiMiddleware(server);

module.exports = server;
