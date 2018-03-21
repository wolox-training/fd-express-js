const sessionService = require('../services/session_service'),
  errors = require('../errors'),
  sessionManager = require('../manager/session_manager');

const sessionParams = params => {
  return params.permit('email', 'password').value();
};

exports.logIn = (req, res, next) => {
  const params = sessionParams(req.parameters);
  sessionService
    .login(params)
    .then(loggedUser => {
      res.status(201);
      res.send({ token: sessionManager.generateAccessToken(loggedUser) });
      res.end();
    })
    .catch(next);
};
