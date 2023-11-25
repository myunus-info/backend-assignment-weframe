const userController = require('./user.controller');

module.exports = app => {
  app.post('/api/users/signup', userController.signup);
  app.post('/api/users/login', userController.login);
};
