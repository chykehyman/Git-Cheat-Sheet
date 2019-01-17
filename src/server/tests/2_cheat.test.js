import { expect, request, STATUS_CODES, wrongToken } from './config';
import data from './__mock__/user.data';
import CategoryModel from '../models/categoryModel';

describe('test cases for cheats', () => {
  let token;
  before(done => {
    request
      .post('/api/signin')
      .send(data.userOneLogin)
      .end((error, response) => {
        token = response.body.payload;
        if (error) done(error);
        done();
      });
  });

  it(
    'should not be able to access the cheats page when security' +
      'token is undefined(not set)',
    done => {
      request.get('/api/cheats').end((error, response) => {
        expect(response.status).to.equal(403);
        expect(response.body).deep.equal({
          status: STATUS_CODES[403],
          message: 'Access denied. You are not logged in'
        });
        if (error) done(error);
        done();
      });
    }
  );
  it(
    'should not be able to access the cheats page with a wrong' +
      'security token',
    done => {
      request
        .get('/api/cheats')
        .set('x-access-token', wrongToken)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).deep.equal({
            status: STATUS_CODES[401],
            message: 'Authentication failed. Token is invalid or expired'
          });
          if (error) done(error);
          done();
        });
    }
  );

  it('should be able to get list of cheats', async () => {
    const count = await CategoryModel.estimatedDocumentCount().exec();
    request
      .get('/api/cheats')
      .set('x-access-token', token)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body.payload).to.have.length(count);
      });
  });
});
