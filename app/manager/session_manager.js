const jwt = require('jwt-simple'),
  config = require('./../../config'),
  User = require('./../models').user;

const SECRET = config.common.session.secret;

exports.decode = toDecode => {
  return new Promise((resolve, reject) => {
    let decodedToken;
    try {
      decodedToken = jwt.decode(toDecode, SECRET);
    } catch (err) {
      reject(err);
    }
    resolve(decodedToken);
  });
};

exports.generateAccessToken = user => {
  return {
    token: jwt.encode(
      {
        authenticationCode: user.authenticationCode,
        id: user.id
      },
      SECRET
    )
  };
};
