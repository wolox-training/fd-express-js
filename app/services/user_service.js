const User = require('../models').user,
  creationError = require('../errors').creationError,
  bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.createUser = user => {
  return bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then(hash => {
      user.password = hash;
      return user;
    })
    .then(u => User.create(u))
    .catch(err => {
      return Promise.reject(creationError);
    });
};
