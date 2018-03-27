const errors = require('../errors');

exports.handle = (req, res, next) => {
  req.currentUser.role === 'ADMIN' ? next() : next(errors.notAdminError);
};
