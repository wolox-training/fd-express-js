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

exports.creationError = {
  statusCode: 400,
  message: 'There has been a problem creating the user'
};
