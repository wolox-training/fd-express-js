const User = require('../models').user;
const creationError = require('../errors').creationError;

exports.createUser = user => {
  return User.create(user).catch(err => {
    throw creationError; // tambien puede ser una funcion y le pasas el mensaje del err o uno custom
  });
};
