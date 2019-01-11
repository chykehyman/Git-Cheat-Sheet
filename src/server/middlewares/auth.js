import jwt from 'jsonwebtoken';
import apiResponse from '../helpers/apiResponse';

export default (request, response, next) => {
  const token = request.body.token || request.query.token || request.headers['x-access-token'];

  if (token) {
    // verifies token and checks if expired or invalid
    return jwt.verify(token, process.env.SECRET_KEY, err => {
      if (err)
        return apiResponse.error(
          response,
          401,
          'Authentication failed. Token is invalid or expired'
        );
      return next();
    });
  }
  return apiResponse.error(response, 403, 'Access denied. You are not logged in');
};
