const bcrypt = require('bcrypt'),
  errors = require('../errors'),
  User = require('../models').user;

exports.login = user => {
  return User.findOne({ where: { email: user.email } }).then(foundUser => {
    if (!foundUser) {
      throw errors.credentialsError;
    }
    return bcrypt.compare(user.password, foundUser.password).then(match => {
      if (!match) {
        throw errors.credentialsError;
      }
      return foundUser;
    });
  });
};
