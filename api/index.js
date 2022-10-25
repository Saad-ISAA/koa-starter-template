'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('@koa/router');

const { apiVersion } = require('../config').server;
const baseName = path.basename(__filename);

function applyApiMiddleware(app) {
  const router = new Router({
    prefix: `/api/${apiVersion}`,
  });

  // Require all the folders and create a sub-router for each feature api
  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== baseName)
    .forEach((file) => {
      // if process.env.ENABLED_APIS is defined, only load the specified apis from the array of strings
      if (process.env.ENABLED_APIS) {
        const enabledApis = process.env.ENABLED_APIS.split(',');
        if (enabledApis.includes('*') || enabledApis.includes(file)) {
          console.log(file);
          const api = require(path.join(__dirname, file))(Router);
          router.use(api.routes());
        }
      } else {
        const api = require(path.join(__dirname, file))(Router);
        router.use(api.routes());
      }
    });

  app.use(router.routes()).use(router.allowedMethods());
}

module.exports = applyApiMiddleware;
