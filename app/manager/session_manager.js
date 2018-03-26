const jwt = require('jwt-simple'),
  config = require('./../../config'),
  User = require('./../models').user;

const SECRET = config.common.session.secret;

exports.decode = toDecode => {
  return new Promise((resolve, reject) => {
    try {
      resolve(jwt.decode(toDecode, SECRET));
    } catch (err) {
      reject(err);
    }
  });
};

exports.generateAccessToken = user => ({
  token: jwt.encode(
    {
      authenticationCode: user.authenticationCode,
      id: user.id
    },
    SECRET
  )
});
