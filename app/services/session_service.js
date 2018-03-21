const User = require('../models').user,
  errors = require('../errors'),
  bcrypt = require('bcrypt');

exports.login = user => {
  return User.findOne({ where: { email: user.email } })
    .then(foundUser => {
      if (!foundUser) {
        throw errors.credentialsError;
      }
      return bcrypt.compare(user.password, foundUser.password).then(match => {
        if (!match) {
          throw errors.credentialsError;
        }
        return foundUser;
      });
    })
    .catch(err => {
      throw err;
    });
};
