exports.notFound = {
  statusCode: 404,
  message: 'Not found'
};

exports.defaultError = message => {
  return {
    statusCode: 500,
    message
  };
};

const badRequest = message => {
  return {
    statusCode: 400,
    message
  };
};

const badGateway = message => {
  return {
    statusCode: 502,
    message
  };
};

const unauthorized = message => {
  return {
    statusCode: 401,
    message
  };
};

const forbidden = message => {
  return {
    statusCode: 403,
    message
  };
};

exports.credentialsError = unauthorized('Invalid credentials');
exports.creationError = badRequest('There has been a problem creating the user');
exports.notLoggedError = unauthorized('Please login to access to this resource');
exports.notAdminError = forbidden('Only admins are allowed to do that');
exports.albumsServerUnavailable = badGateway('Album server is temporary unavailable');
