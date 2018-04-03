const albumService = require('../services/album_service'),
  errors = require('../errors');

exports.index = (req, res, next) => {
  albumService
    .list()
    .then(allAlbums => {
      res.status(200);
      res.send(allAlbums);
      res.end();
    })
    .catch(next);
};
