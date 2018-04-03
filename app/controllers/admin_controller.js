const userService = require('../services/user_service'),
  errors = require('../errors'),
  User = require('../models').user;

const adminParams = params => {
  return params
    .require('user')
    .permit('password', 'firstName', 'lastName', 'email')
    .value();
};

exports.create = (req, res, next) => {
  const params = adminParams(req.parameters);
  userService
    .createOrUpdateAdmin(params)
    .then(newAdmin => {
      res.status(201);
      res.send(`The admin ${newAdmin.firstName} ${newAdmin.lastName} has succesfully been created`);
    })
    .catch(next);
};
