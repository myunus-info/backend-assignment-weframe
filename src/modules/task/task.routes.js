const path = require('path');
const taskController = require('./task.controller');
const UserStrategy = require(path.join(
  process.cwd(),
  'src/modules/user/user.authentication.middleware'
));

module.exports = app => {
  app.route('/api/tasks').post(UserStrategy, taskController.createTask).get(taskController.getAllTasks);

  app.get('/api/tasks/stats', taskController.calculateWeeklyCompletedTasks);

  app
    .route('/api/tasks/:id')
    .get(taskController.getTaskById)
    .patch(UserStrategy, taskController.updateTaskById)
    .delete(UserStrategy, taskController.deleteTaskById);
};
