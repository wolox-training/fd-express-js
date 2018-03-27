const User = require('../models').user,
  errors = require('../errors'),
  bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const PASSWORD_MIN_LENGTH = 8;

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) && email.endsWith('@wolox.com.ar');
}

function validateUser(user) {
  return /\d/.test(user.password) && user.password.length >= PASSWORD_MIN_LENGTH && validateEmail(user.email);
}

function hashPassword(params) {
  return bcrypt.hash(params.password, SALT_ROUNDS).then(hash => {
    params.password = hash;
    return params;
  });
}

exports.createUser = user => {
  if (!validateUser(user)) {
    throw errors.creationError;
  }
  return hashPassword(user)
    .then(u => User.create(u))
    .catch(err => {
      throw errors.creationError;
    });
};

exports.createOrUpdateAdmin = params => {
  if (!validateUser(params)) {
    throw errors.creationError;
  }
  return Promise.all([hashPassword(params), User.findOrBuild({ where: { email: params.email } })])
    .then(values => values[1][0].update(Object.assign({}, values[0], { role: 'ADMIN' })))
    .catch(err => {
      throw errors.creationError;
    });
};
