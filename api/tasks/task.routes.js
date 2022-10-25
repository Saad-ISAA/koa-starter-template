'use strict';

const controller = require('./task.controller');

module.exports = (Router) => {
  const router = new Router({
    prefix: `/tasks`,
  });

  router
    .get('/:taskId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne);

  return router;
};
