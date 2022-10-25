'use strict';

const generateId = require('../../utils/generateId.util');

/**
 * Mock database, replace this with your db models import, required to perform query to your database.
 */
const db = {
  tasks: [
    {
      id: 'bff28903-042e-47c2-b9ee-07c3954989ec',
      name: 'Marco',
      created_at: 1558536830937,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Leonardo',
      created_at: 1558536843742,
    },
    {
      id: 'dca01a32-36e6-4886-af75-8e7caa0162a9',
      name: 'Berta',
      created_at: 1558536863550,
    },
  ],
};

exports.getOne = (ctx) => {
  const { taskId } = ctx.params;
  const task = db.tasks.find((task) => task.id === taskId);
  ctx.assert(task, 404, "The requested task doesn't exist");
  ctx.status = 200;
  ctx.body = task;
};

exports.getAll = async (ctx) => {
  ctx.status = 200;
  ctx.body = db.tasks;
};

exports.createOne = async (ctx) => {
  const { name } = ctx.request.body;
  ctx.assert(name, 400, 'The task info is malformed!');
  const id = generateId();
  const newTask = {
    id,
    name,
    timestamp: Date.now(),
  };
  db.tasks.push(newTask);
  const createdTask = db.tasks.find((task) => task.id === id);
  ctx.status = 201;
  ctx.body = createdTask;
};
