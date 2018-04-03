const userController = require('./controllers/users_controller'),
  adminController = require('./controllers/admin_controller'),
  authentication = require('../app/middlewares/authentication'),
  sessionController = require('./controllers/sessions_controller'),
  adminPermissions = require('../app/middlewares/admin_permissions');

exports.init = app => {
  app.post('/users', userController.signUp);
  app.post('/admin/users', [authentication.handle, adminPermissions.handle], adminController.create);
  app.post('/users/sessions', sessionController.logIn);
  app.get('/users', authentication.handle, userController.index);
};
