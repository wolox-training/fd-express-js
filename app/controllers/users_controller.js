const User = require('../models').user,
  createUser = require('../services/user_service').createUser,
  creationError = require('../errors').creationError;

const PASSWORD_MIN_LENGTH = 8;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) && email.endsWith('@wolox.com.ar');
}

function validateUser(user) {
  return /\d/.test(user.password) && user.password.length >= PASSWORD_MIN_LENGTH && validateEmail(user.email);
}

const userParams = params => {
  return params
    .require('user')
    .permit('password', 'firstName', 'lastName', 'email')
    .value();
};

exports.signUp = (req, res, next) => {
  const params = userParams(req.parameters);
  const verifiedParameters = validateUser(params) ? Promise.resolve() : Promise.reject();

  verifiedParameters
    .then(createUser)
    .then(createdUser => {
      res.status(201);
      res.send(`The user ${createdUser.firstName} ${createdUser.lastName} has succesfully login`);
      res.end();
    })
    .catch(next);
};
