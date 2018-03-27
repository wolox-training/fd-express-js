const errors = require('../errors'),
  User = require('../models').user,
  sessionManager = require('../manager/session_manager');

exports.handle = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    next(errors.notLoggedError);
  }
  sessionManager
    .decode(token)
    .then(decodedToken => {
      User.findOne({ where: { id: decodedToken.id } })
        .then(foundUser => {
          if (foundUser) {
            req.currentUser = foundUser;
            next();
          } else {
            next(errors.notLoggedError);
          }
        })
        .catch(next);
    })
    .catch(err => {
      next(errors.notLoggedError);
    });
};
