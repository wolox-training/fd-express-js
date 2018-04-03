const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  should = chai.should(),
  userService = require('../../app/services/user_service'),
  factory = require('factory-girl').factory,
  sessionManager = require('../../app/manager/session_manager'),
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
            User.findOne({ where: { email: 'federico.dinucci@wolox.com.ar' } }).then(
              foundUser => foundUser.should.not.be.null
            );
            dictum.chai(res, 'User Creation');
          })
          .then(() => done());
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
          .then(() => done());
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
          .then(() => done());
      });
    });
    context('when a user with the same email exists', () => {
      beforeEach(done => {
        User.create({
          password: '1234567890',
          email: 'federico.dinucci@wolox.com.ar',
          firstName: 'Federico',
          lastName: 'Di Nucci'
        }).then(() => done());
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
          .then(() => done());
      });
    });
  });

  describe('/users GET', () => {
    context('when some users exists', () => {
      let token;
      let aUser;
      beforeEach(done => {
        factory
          .createMany('user', 5)
          .then(userArray => {
            token = sessionManager.generateAccessToken(userArray[0]);
          })
          .then(() => done());
      });
      context('and a user is logged', () => {
        it('should return ok status and 5 users', done => {
          chai
            .request(server)
            .get('/users')
            .set('Authorization', token)
            .send()
            .then(res => {
              res.should.have.status(200);
              res.body.length.should.be.eql(5);
              dictum.chai(res, 'Session Creation');
            })
            .then(() => done());
        });
      });
      context('and a user is not logged', () => {
        it('should return unauthorized status code', done => {
          chai
            .request(server)
            .get('/users')
            .send()
            .catch(err => {
              err.should.have.status(401);
            })
            .then(() => done());
        });
      });
    });
  });
});
