const userService = require('../services/user_service'),
  errors = require('../errors'),
  User = require('../models').user;

const userParams = params => {
  return params
    .require('user')
    .permit('password', 'firstName', 'lastName', 'email')
    .value();
};

exports.signUp = (req, res, next) => {
  const params = userParams(req.parameters);
  userService
    .createUser(params)
    .then(createdUser => {
      res.status(201);
      res.send(`The user ${createdUser.firstName} ${createdUser.lastName} has succesfully login`);
    })
    .catch(next);
};

exports.index = (req, res, next) => {
  User.findAll()
    .then(allUsers => {
      res.status(200);
      res.send(allUsers);
      res.end();
    })
    .catch(next);
};
