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

exports.creationError = badRequest('There has been a problem creating the user');
