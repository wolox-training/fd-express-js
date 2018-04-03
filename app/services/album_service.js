const fetch = require('node-fetch'),
  errors = require('../errors');

exports.list = () => {
  return fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .catch(err => {
      throw errors.albumsServerUnavailable;
    });
};
