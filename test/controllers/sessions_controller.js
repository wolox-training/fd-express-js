const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  should = chai.should(),
  User = require('../../app/models').user,
  userService = require('../../app/services/user_service');

describe('Sessions Controller', () => {
  describe('/users/session POST', () => {
    context('when a user exists', () => {
      beforeEach(done => {
        userService
          .createUser({
            password: '1234567890',
            email: 'federico.dinucci@wolox.com.ar',
            firstName: 'Federico',
            lastName: 'Di Nucci'
          })
          .then(() => done());
      });
      context('and the information is valid', () => {
        it('should return created status', done => {
          chai
            .request(server)
            .post('/users/sessions')
            .send({
              password: '1234567890',
              email: 'federico.dinucci@wolox.com.ar'
            })
            .then(res => {
              res.should.have.status(201);
              dictum.chai(res, 'Session Creation');
            })
            .then(() => done());
        });
      });
      context('and the email doesnt exits', () => {
        it('should fail signing in', done => {
          chai
            .request(server)
            .post('/users/sessions')
            .send({
              password: '1234567890',
              email: 'federico.dinucci1@wolox.com.ar'
            })
            .catch(err => {
              err.should.have.status(401);
            })
            .then(() => done());
        });
      });
      context('and the password does match the user', () => {
        it('should fail signing in', done => {
          chai
            .request(server)
            .post('/users/sessions')
            .send({
              password: 'incorrectPassword',
              email: 'federico.dinucci@wolox.com.ar'
            })
            .catch(err => {
              err.should.have.status(401);
            })
            .then(() => done());
        });
      });
    });
  });
});
