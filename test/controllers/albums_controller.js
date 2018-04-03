const chai = require('chai'),
  dictum = require('dictum.js'),
  factory = require('factory-girl').factory,
  nock = require('nock'),
  server = require('./../../app'),
  should = chai.should(),
  userService = require('../../app/services/user_service'),
  sessionManager = require('../../app/manager/session_manager'),
  User = require('../../app/models').user;

describe('album controller', () => {
  describe('/albums GET', () => {
    context('When a user is logged', () => {
      let token;
      const albums = nock('https://jsonplaceholder.typicode.com')
        .get(`/albums`)
        .reply(200, [
          {
            userId: 1,
            id: 1,
            title: 'quidem molestiae enim'
          },
          {
            userId: 1,
            id: 2,
            title: 'sunt qui excepturi placeat culpa'
          },
          {
            userId: 1,
            id: 3,
            title: 'omnis laborum odio'
          }
        ]);
      beforeEach(done => {
        factory
          .create('user')
          .then(user => {
            token = sessionManager.generateAccessToken(user);
          })
          .then(() => done());
      });
      it('returns ok status', done => {
        chai
          .request(server)
          .get('/albums')
          .set('Authorization', token)
          .send()
          .then(res => {
            res.should.have.status(200);
            dictum.chai(res, 'Admin Creation');
          })
          .then(() => done());
      });
    });
    context('When a user is not logged', () => {
      it('returns unauthorized status', done => {
        chai
          .request(server)
          .get('/albums')
          .send()
          .catch(err => {
            err.should.have.status(401);
          })
          .then(() => done());
      });
    });
  });
});
