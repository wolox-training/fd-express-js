const userController = require('./controllers/users_controller'),
  authentication = require('../app/middlewares/authentication'),
  sessionController = require('./controllers/sessions_controller');

exports.init = app => {
  app.post('/users', userController.signUp);
  app.post('/users/sessions', sessionController.logIn);
  app.get('/users', [authentication.handle], userController.index);
};
