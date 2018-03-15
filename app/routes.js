const userController = require('./controllers/users_controller');

exports.init = app => {
  app.post('/users', userController.signUp);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
};
