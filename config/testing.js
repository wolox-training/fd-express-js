exports.config = {
  environment: 'testing',
  isTesting: true,
  common: {
    database: {
      name: process.env.NODE_API_DB_NAME_TEST
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET
    }
  }
};
