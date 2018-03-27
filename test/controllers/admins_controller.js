const chai = require('chai'),
  dictum = require('dictum.js'),
  server = require('./../../app'),
  should = chai.should(),
  userService = require('../../app/services/user_service'),
  factory = require('factory-girl').factory,
  sessionManager = require('../../app/manager/session_manager'),
  User = require('../../app/models').user;

describe('admins controller', () => {
  describe('/admin/users POST', () => {
    context('when an admin is logged', () => {
      let token;
      beforeEach(done => {
        factory
          .create('user', { role: 'ADMIN' })
          .then(user => {
            token = sessionManager.generateAccessToken(user);
          })
          .then(() => done());
      });
      context('when information is valid', () => {
        it('should return created status', done => {
          chai
            .request(server)
            .post('/admin/users')
            .set('Authorization', token)
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
                foundAdmin => foundAdmin.should.not.be.null
              );
              dictum.chai(res, 'Admin Creation');
            })
            .then(() => done());
        });
      });
      context('when a required parameter is missing', () => {
        it('should fail signing up', done => {
          chai
            .request(server)
            .post('/admin/users')
            .set('Authorization', token)
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
            .post('/admin/users')
            .set('Authorization', token)
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

      context('when a user/admin with the same email exists', () => {
        beforeEach(done => {
          User.create({
            password: '1234567890',
            email: 'federico.dinucci@wolox.com.ar',
            firstName: 'Federico',
            lastName: 'Di Nucci'
          }).then(() => done());
        });
        it('should upgrade him to admin', done => {
          chai
            .request(server)
            .post('/admin/users')
            .set('Authorization', token)
            .send({
              user: {
                password: '1234567890',
                email: 'federico.dinucci@wolox.com.ar',
                firstName: 'Ignacio',
                lastName: 'Torres'
              }
            })
            .then(res => {
              res.should.have.status(201);
              let admin;
              User.findOne({ where: { email: 'federico.dinucci@wolox.com.ar' } }).then(foundAdmin =>
                foundAdmin.role.should.equal('ADMIN')
              );
            })
            .then(() => done());
        });
      });
    });

    context('When a user is logged but its not an admin', () => {
      let token;
      beforeEach(done => {
        factory
          .create('user', { role: 'MEMBER' })
          .then(user => {
            token = sessionManager.generateAccessToken(user);
          })
          .then(() => done());
      });
      context('even though the information is valid', () => {
        it('should return forbidden status', done => {
          chai
            .request(server)
            .post('/admin/users')
            .set('Authorization', token)
            .send({
              user: {
                password: '1234567890',
                email: 'federico.dinucci@wolox.com.ar',
                firstName: 'Federico',
                lastName: 'Di Nucci'
              }
            })
            .catch(err => {
              err.should.have.status(403);
            })
            .then(() => done());
        });
      });
    });
  });
});
