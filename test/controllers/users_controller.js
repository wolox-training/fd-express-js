const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  should = chai.should(),
  User = require('../../app/models').user;

describe('users controller', () => {
  describe('/users POST', () => {
    context('when information is valid', () => {
      it('should return created status', done => {
        chai
          .request(server)
          .post('/users')
          .send({
            user: {
              password: '1234567890',
              email: 'federico.dinucci@wolox.com.ar',
              firstName: 'Federico',
              lastName: 'Di Nucci'
            }
          })
          .then(res => {
            res.should.have.status(201);
            dictum.chai(res, 'User Creation');
          })
          .then(done);
      });
    });
    context('when a required parameter is missing', () => {
      it('should fail signing up', done => {
        chai
          .request(server)
          .post('/users')
          .send({
            user: {
              password: '1234567890',
              email: 'federico.dinucci@wolox.com.ar',
              firstName: 'Federico'
            }
          })
          .catch(err => {
            err.should.have.status(400);
          })
          .then(done);
      });
    });
    context('when the password does not meet the requirements', () => {
      it('should fail signing up', done => {
        chai
          .request(server)
          .post('/users')
          .send({
            user: {
              password: 'passwordwithoutnumbers',
              email: 'federico.dinucci@wolox.com.ar',
              firstName: 'Federico'
            }
          })
          .catch(err => {
            err.should.have.status(400);
          })
          .then(done);
      });
    });
    context('when a user with the same email exists', () => {
      beforeEach(done => {
        User.create({
          password: '1234567890',
          email: 'federico.dinucci@wolox.com.ar',
          firstName: 'Federico',
          lastName: 'Di Nucci'
        }).then(done());
      });
      it('should fail signing up', done => {
        chai
          .request(server)
          .post('/users')
          .send({
            user: {
              password: '1234567890',
              email: 'federico.dinucci@wolox.com.ar',
              firstName: 'Federico',
              lastName: 'Di Nucci'
            }
          })
          .catch(err => {
            err.should.have.status(400);
          })
          .then(done);
      });
    });
  });
});
