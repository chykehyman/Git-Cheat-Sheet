import { expect, request, STATUS_CODES } from './config';
import UserModel from '../models/userModel';
import data from './__mock__/user.data';

describe('test cases for user sign up and sign in operations', () => {
  before(done => {
    UserModel.collection.deleteMany({}).then(() => {
      done();
    });
  });

  describe('sign up positive test cases', () => {
    it('should be able to create a new user account successfully', done => {
      request
        .post('/api/signup')
        .send(data.validData1)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('payload');
          expect(response.body.message).to.equal('Signup is successful');
          expect(response.body.status).to.equal(STATUS_CODES[201]);
          if (error) done(error);
          done();
        });
    });
    it('should be able to create another new user account successfully', done => {
      request
        .post('/api/signup')
        .send(data.validData2)
        .end((error, response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.haveOwnProperty('payload');
          expect(response.body.message).to.equal('Signup is successful');
          expect(response.body.status).to.equal(STATUS_CODES[201]);
          if (error) done(error);
          done();
        });
    });
    it('should have created two user accounts', async () => {
      const userCount = await UserModel.estimatedDocumentCount().exec();
      expect(userCount).to.equal(2);
    });
  });
  describe('sign up negative test cases', () => {
    it('should not be able to create a new account with empty input fields', done => {
      request
        .post('/api/signup')
        .send(data.emptyData)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect('Username is required').to.equal(
            response.body.message.username
          );
          expect('Password is required').to.equal(
            response.body.message.password
          );
          if (error) done(error);
          done();
        });
    });
    it(
      'should not be able to create a new account when ' +
        'username field starts with a number' +
        ' and password length is not between 6 and 30',
      done => {
        request
          .post('/api/signup')
          .send(data.improperData)
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect('Username must not start with a number').to.equal(
              response.body.message.username
            );
            expect('Password length must be between 6 and 30').to.equal(
              response.body.message.password
            );
            if (error) done(error);
            done();
          });
      }
    );
    it(`should not be able to create a new account with short username and mismatching
        password and confirm password fields`, done => {
      request
        .post('/api/signup')
        .send(data.improperData2)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect('Username must be at least 3 to 25 characters').to.equal(
            response.body.message.username
          );
          expect('Passwords do not match').to.equal(
            response.body.message.password
          );
          if (error) done(error);
          done();
        });
    });
    it(
      'should not be able to create a new account with existing' +
        'username record',
      done => {
        request
          .post('/api//signup')
          .send(data.validData1)
          .end((error, response) => {
            expect(response.status).to.equal(409);
            expect(response.body).deep.equal({
              status: STATUS_CODES[409],
              message: 'Username is already taken'
            });
            if (error) done(error);
            done();
          });
      }
    );
  });

  describe('sign in negative test cases', () => {
    it('should not be able to login the user with empty input fields', done => {
      request
        .post('/api/signin')
        .send(data.emptyLoginData)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect('Username is required').to.equal(
            response.body.message.username
          );
          expect('Password is required').to.equal(
            response.body.message.password
          );
          if (error) done(error);
          done();
        });
    });
    it('should not be able to login the user with wrong username', done => {
      request
        .post('/api/signin')
        .send(data.invalidUsername)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).deep.equal({
            status: STATUS_CODES[400],
            message: 'Invalid username or password'
          });
          if (error) done(error);
          done();
        });
    });
    it('should not be able to login with wrong password', done => {
      request
        .post('/api/signin')
        .send(data.invalidPassword)
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).deep.equal({
            status: STATUS_CODES[400],
            message: 'Invalid username or password'
          });
          if (error) done(error);
          done();
        });
    });
  });
  describe('sign in positive test case', () => {
    it('should be able to login to the application with valid credentials', done => {
      request
        .post('/api/signin')
        .send(data.userOneLogin)
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.haveOwnProperty('payload');
          expect('Signin is successful').to.equal(response.body.message);
          if (error) done(error);
          done();
        });
    });
  });
});
