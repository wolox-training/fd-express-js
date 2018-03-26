const userController = require('./controllers/users_controller'),
  sessionController = require('./controllers/sessions_controller');

exports.init = app => {
  app.post('/users', userController.signUp);
  app.post('/users/sessions', sessionController.logIn);
};
